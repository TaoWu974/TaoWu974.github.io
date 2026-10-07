# Generate Chinese counterparts while retaining existing English URLs and content.
module Jekyll
  module LocalizedLinks
    def localized_url(url, language = 'en')
      return url unless url.is_a?(String) && url.start_with?('/')
      return url if url.start_with?('//', '/assets/', '/zh/') || language != 'zh-CN'
      site = @context.registers[:site]
      site.config.fetch('translated_routes', {}).fetch(url, url)
    end
  end

  class ChinesePages < Generator
    safe true
    priority :normal

    def generate(site)
      originals = site.pages + site.collections.values.flat_map(&:docs)
      routes = {}
      Dir[File.join(site.source, '_i18n/zh/*.md')].sort.each do |path|
        text = File.read(path, encoding: 'UTF-8')
        match = text.match(/\A---\s*\n(.*?)\n---\s*\n(.*)\z/m)
        raise "Invalid translation front matter: #{path}" unless match
        data = SafeYAML.load(match[1])
        original = originals.find { |item| item.url == data.fetch('original_url') }
        raise "Translation has no original: #{path}" unless original
        url = '/zh' + original.url
        page = PageWithoutAFile.new(site, site.source, url.sub(%r{\A/}, ''), 'index.md')
        page.content = match[2]
        page.data = original.data.merge(data).merge('lang' => 'zh-CN', 'permalink' => url, 'translation_url' => original.url)
        # Content collections already have their own navigation; do not add duplicates.
        original.data['translation_url'] = url
        routes[original.url] = url
        site.pages << page
      end
      site.config['translated_routes'] = routes
    end
  end
end
Liquid::Template.register_filter(Jekyll::LocalizedLinks)
