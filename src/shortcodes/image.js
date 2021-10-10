const path = require("path");
const Image = require("@11ty/eleventy-img");

function generateClassStr(classes) {
  if (!classes.length) return "";

  return;
}

// https://www.11ty.dev/docs/plugins/image/#filter-diy-picture-btn
module.exports = async function (src, alt, classes = "", sizes = "100vw") {
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on responsive image from: ${src}`);
  }

  const widths = [390, 585, 780, 1170, 1560];

  const imagePath = path.join(process.cwd(), "src", src);

  const metadata = await Image(imagePath, {
    widths,
    formats: ["webp", "jpg"],
    urlPath: "/images/",
    outputDir: "./dist/images",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    },
  });

  const lowsrc = metadata.jpeg[0];
  const highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  const srcSet = (imageFormat) =>
    imageFormat.map((entry) => entry.srcset).join(", ");

  let classStr = "";
  if (classes.length) {
    classStr += ` class="${classes}"`;
  }

  return `<picture${classStr}>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `
        <source
          type="${imageFormat[0].sourceType}"
          srcset="${srcSet(imageFormat)}"
          sizes="${sizes}"
        >`;
      })
      .join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
};
