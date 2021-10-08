const imageShortcode = require("./src/shortcodes/image");
const htmlMinTransform = require("./src/transforms/html-min-transform");

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

  return {
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
