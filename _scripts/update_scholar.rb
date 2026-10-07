#!/usr/bin/env ruby
# Fetch one public profile; never turn a failed fetch into a zero citation count.
require 'json'
require 'open3'
require 'uri'
require 'nokogiri'
require 'optparse'
require 'time'
require 'fileutils'

module ScholarSnapshot
  PROFILE_ID = 'maF2KooAAAAJ'.freeze
  PROFILE_URL = "https://scholar.google.com/citations?user=#{PROFILE_ID}&hl=en".freeze

  def self.get(url)
    uri = URI(url)
    raise 'Only HTTPS is supported' unless uri.scheme == 'https'
    # Use the platform's curl certificate store, retaining HTTPS verification.
    body, error, status = Open3.capture3('curl', '--silent', '--show-error', '--fail', '--location',
      '--proto', '=https', '--proto-redir', '=https', '--connect-timeout', '10', '--max-time', '30', uri.to_s)
    raise "Fetch failed: #{error.strip}" unless status.success?
    body
  end

  def self.integer(text)
    value = text.to_s.strip.delete(',')
    raise "Invalid metric: #{text.inspect}" unless value.match?(/\A\d+\z/)
    Integer(value)
  end

  def self.parse(html, fetched_at: Time.now.utc)
    doc = Nokogiri::HTML(html)
    raise 'Expected Tao Wu public profile; blocked or changed response' unless doc.at_css('#gsc_prf_in')&.text&.strip == 'Tao Wu'
    rows = doc.css('#gsc_rsb_st tr').select { |row| row.css('.gsc_rsb_std').size == 2 }
    raise 'Citation metrics are missing' unless rows.size == 3
    metrics = %w[citation_count h_index i10_index].zip(rows.map { |row| integer(row.css('.gsc_rsb_std').first.text) }).to_h
    publications = {}
    doc.css('.gsc_a_tr').each do |row|
      title = row.at_css('.gsc_a_at')
      count = row.at_css('.gsc_a_ac')
      raise 'Invalid publication row' unless title && count
      query = URI.decode_www_form(URI(title['href']).query.to_s).to_h
      full_id = query['citation_for_view'].to_s
      raise 'Publication belongs to a different profile' unless full_id.start_with?(PROFILE_ID + ':')
      id = full_id.split(':', 2).last
      count_text = count.text.strip
      publications[id] = {
        'title' => title.text.strip,
        # An empty citation link in a valid Scholar row means zero citations.
        'citation_count' => count_text.empty? ? 0 : integer(count_text.delete('*')),
        'estimated' => count_text.include?('*'),
        'year' => row.at_css('.gsc_a_y')&.text&.strip,
        'url' => PROFILE_URL + "&view_op=view_citation&citation_for_view=#{PROFILE_ID}:#{id}"
      }
    end
    raise 'No publications found' if publications.empty?
    years = doc.css('.gsc_g_t').map { |node| integer(node.text) }
    counts = doc.css('.gsc_g_al').map { |node| integer(node.text) }
    raise 'Citation graph is incomplete' unless years.size == counts.size
    {
      'source' => 'Google Scholar', 'profile_id' => PROFILE_ID, 'profile_url' => PROFILE_URL,
      'updated_at' => fetched_at.utc.iso8601, 'metrics' => metrics,
      'years' => years.zip(counts).map { |year, count| { 'year' => year, 'count' => count } },
      'publications' => publications
    }
  end

  def self.validate(data)
    raise 'Snapshot profile does not match' unless data['profile_id'] == PROFILE_ID && data['source'] == 'Google Scholar'
    Time.iso8601(data.fetch('updated_at'))
    %w[citation_count h_index i10_index].each do |key|
      value = data.fetch('metrics').fetch(key)
      raise 'Invalid cached metric' unless value.is_a?(Integer) && value >= 0
    end
    raise 'Invalid cached publications' unless data['publications'].is_a?(Hash)
    data
  end

  def self.write(path, data)
    validate(data)
    FileUtils.mkdir_p(File.dirname(path))
    temporary = path + '.tmp'
    File.write(temporary, JSON.pretty_generate(data) + "\n")
    File.rename(temporary, path)
  end
end

if $PROGRAM_NAME == __FILE__
  options = {}
  OptionParser.new do |parser|
    parser.on('--html PATH', 'Parse a previously fetched public profile') { |value| options[:html] = value }
    parser.on('--previous-url URL', 'Restore the latest published snapshot before refreshing') { |value| options[:previous_url] = value }
  end.parse!
  destination = File.expand_path('../assets/json/scholar.json', __dir__)
  if options[:previous_url]
    begin
      previous = ScholarSnapshot.validate(JSON.parse(ScholarSnapshot.get(options[:previous_url])))
      existing = File.file?(destination) ? ScholarSnapshot.validate(JSON.parse(File.read(destination))) : nil
      if !existing || Time.iso8601(previous['updated_at']) > Time.iso8601(existing['updated_at'])
        ScholarSnapshot.write(destination, previous)
      end
    rescue StandardError => error
      warn "Published snapshot unavailable: #{error.message}; keeping the local snapshot."
    end
  end
  begin
    html = options[:html] ? File.read(options[:html]) : ScholarSnapshot.get(ScholarSnapshot::PROFILE_URL + '&pagesize=100')
    fetched_at = options[:html] ? File.mtime(options[:html]) : Time.now
    data = ScholarSnapshot.parse(html, fetched_at: fetched_at)
    ScholarSnapshot.write(destination, data)
    puts "Scholar updated: #{data['metrics']['citation_count']} citations; #{data['publications'].size} publications; #{data['updated_at']}."
  rescue StandardError => error
    warn "Scholar refresh failed: #{error.message}. Last successful snapshot preserved."
    exit 1
  end
end
