const imageShortcode = require("./src/shortcodes/image");
const htmlMinTransform = require("./src/transforms/html-min-transform");
const markdownIt = require("markdown-it");

module.exports = function (config) {
  // Sass
  config.addWatchTarget("./src/scss");

  // Passthrough
  config.addPassthroughCopy("./src/js");
  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy("./src/images/logos");
  config.addPassthroughCopy({ "./src/images/passthrough": "images/" });
  config.addPassthroughCopy({
    "./node_modules/lite-youtube-embed/src/lite-yt-embed.css":
      "css/lite-yt.css",
  });

  config.addPassthroughCopy({
    "./node_modules/lite-youtube-embed/src/lite-yt-embed.js": "js/lite-yt.js",
  });

  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addTransform("htmlmin", htmlMinTransform);

  let markdownOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  config.setLibrary("md", markdownIt(markdownOptions));

  config.addCollection("sortedFounders", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("founders")
      .sort((a, b) => a.data.order - b.data.order);
  });

  return {
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
