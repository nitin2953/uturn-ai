const beautify = require("js-beautify")
const qrcode = require("qrcode-terminal")
const devIp = require("dev-ip")

function Beautify(content, outputPath) {
	const beautifyConfig = {
		indent_with_tabs: true,
		end_with_newline: true,
		wrap_line_length: 160,
		max_preserve_newlines: 1
	}

	if (!outputPath) return

	let extension = outputPath.split(".").pop()
	switch (extension) {
		case "html": return beautify.html(content, beautifyConfig)
		case "css": return beautify.css(content, beautifyConfig)
		case "js": return beautify.js(content, beautifyConfig)
	}
	return content
}

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true)
	eleventyConfig.addTransform("beautify", Beautify)

	eleventyConfig.setServerOptions({ showAllHosts: true })
	let devip = "http://" + devIp()[0] + ":8080"
	if (devIp()[0]) {
		console.log(devip)
		qrcode.generate(devip, { small: true })
	}

	eleventyConfig.addShortcode('renderlayoutblock', function(name) {
		return (this.page.layoutblock || {})[name] || ''
	})
	eleventyConfig.addPairedShortcode('layoutblock', function(content, name) {
		if (!this.page.layoutblock) this.page.layoutblock = {}
		this.page.layoutblock[name] = content
		return ''
	})

	eleventyConfig.addWatchTarget("src")
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({ "public": "." });

	return {
		templateFormats: ["njk", "md", "html"],
		markdownTemplateEngine: "njk",

		dir: {
			input: "src/pages",
			includes: "../components",
			layouts: "../layouts",
			data: "../data",
			output: "dist"
		}
	}
}
