const withBuilderDevTools = require("@builder.io/dev-tools/next")();

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({
  output: "export",
  // Use empty basePath or conditionally set it
  basePath: process.env.NODE_ENV === "production" ? "/coomer_mobile_pages" : "",
  images: {
    unoptimized: true,
  },
  // Add this to handle asset paths correctly
  assetPrefix: process.env.NODE_ENV === "production" ? "/coomer_mobile_pages" : "",
});

module.exports = nextConfig;