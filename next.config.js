/** @type {import('next').NextConfig} */

const nextConfig = {
  // Prevent dev/build cache collisions that can break vendor chunks on Windows.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

module.exports = nextConfig;
