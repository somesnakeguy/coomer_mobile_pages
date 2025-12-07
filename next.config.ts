const withBuilderDevTools = require("@builder.io/dev-tools/next")();

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({
  output: "export", // Critical for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/coomer_mobile_pages" : "",
  images: {
    unoptimized: true, // Required for static export
  },
});

module.exports = nextConfig;
