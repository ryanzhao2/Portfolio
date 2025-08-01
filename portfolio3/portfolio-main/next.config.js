/** @type {import('next').NextConfig} */

const nextConfig = {
  // Internally maps /resume to /api/resume without changing the URL for the user
  // just wanted a cleaner resume URL
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/api/resume",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      { hostname: "icons.duckduckgo.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "www.google.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);