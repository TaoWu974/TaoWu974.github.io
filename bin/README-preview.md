# Personal homepage preview

## Languages and citation data

English URLs are retained. Chinese counterparts are generated under `/zh/`
from `_i18n/zh/`; shared interface labels live in `_data/i18n.yml`.
The language link takes readers to the corresponding page.

Individual article citation badges are read from
`assets/json/scholar.json`. The deployment workflow refreshes the public profile
every six hours, then rebuilds the site. A failed refresh preserves the most
recent published snapshot. This is scheduled synchronization, not a live
Google Scholar API. Each compact badge links to the publication's Scholar
record; its tooltip includes the successful-fetch time. No aggregate impact
panel or opportunity statement is displayed.

Project figures are rendered from four Glasgow ePrints accepted manuscripts.
The source URLs, figure numbers, PDF pages and crop coordinates are recorded in
`_data/paper_figures.json`. Method diagrams summarize the papers in native HTML/CSS;
their labels live in `_data/paper_methods.yml`. PNGs retain the original plot axes
and legends. Quantitative descriptions distinguish simulation from measurement.

To refresh locally, run `vendor/ruby/bin/ruby -r bundler/setup
_scripts/update_scholar.rb`. No API key is required.

From the repository directory, run `bin/preview`. The preview is served at
`http://127.0.0.1:4100`. Set `PORT=4101` if another preview already uses port 4100.
The helper uses the checkout-local Ruby installation when it is available;
otherwise it uses your existing Bundler installation. Install the Gemfile
dependencies before running it in a fresh checkout.

If ImageMagick is unavailable, the local preview uses the original images.
The existing GitHub Actions deployment still generates responsive WebP images.
The `vendor/` runtime, installed gems, and `_site/` build output are ignored by Git.

Homepage research cards live in `_data/research.yml`; the reading hub lives in
`_data/notes.yml`. Existing project URLs and article prose are retained. Interactive
illustrations are defined in `assets/js/research-demos.js` and are explicitly
labeled as teaching examples. They do not claim new simulation or measurement results.

Publication records were checked against the University of Glasgow repository:

- [LADS / EuCAP 2026](https://eprints.gla.ac.uk/392786/)
- [MRR–SSG / ECOC 2025](https://eprints.gla.ac.uk/359591/)
- [DC-SADEA / IEEE TAP](https://eprints.gla.ac.uk/352578/)
- [E-GASPAD / IEEE TMTT](https://eprints.gla.ac.uk/329166/)

The original LEAM preprint is retained as version 1 and distinguished from its
revised, published conference version. The TMTT article uses its 2025 volume year;
the CV also preserves the December 2024 online-publication date.
