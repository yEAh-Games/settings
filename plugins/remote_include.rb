require 'open-uri'

module Jekyll
  class RemoteInclude < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url.strip
    end

    def render(context)
      url = context[@url] || @url

      unless url =~ URI::regexp
        return "Invalid URL: #{url}"
      end

      filename = File.basename(url)
      filepath = File.join("_includes", filename)
      open(filepath, 'wb') do |file|
        file << open(url).read
      end

      site = context.registers[:site]
      include_tag = Jekyll::Tags::IncludeTag.new("include", filename, [])
      include_tag.render(context)
    end
  end
end

Liquid::Template.register_tag('remote_include', Jekyll::RemoteInclude)
