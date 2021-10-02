const imageShortcode = require("./src/shortcodes/image");
const htmlMinTransform = require("./src/transforms/html-min-transform");

module.exports = function (config) {
  // Sass
  config.addWatchTarget("./src/scss");

  // Passthrough
  config.addPassthroughCopy("./src/js");
  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy("./src/admin");
  config.addPassthroughCopy("./src/images/favicon.png");
  config.addPassthroughCopy("./src/images/logos");

  config.addNunjucksAsyncShortcode("image", imageShortcode);

  // Transforms
  if (process.env.ELEVENTY_ENV === "production") {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  return {
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
