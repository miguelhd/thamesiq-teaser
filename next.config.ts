import type { NextConfig } from "next";
import type { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  webpack(config: webpack.Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;