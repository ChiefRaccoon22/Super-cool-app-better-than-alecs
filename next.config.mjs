/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/super-cool-app-better-than-alecs",
  assetPrefix: "/super-cool-app-better-than-alecs",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
