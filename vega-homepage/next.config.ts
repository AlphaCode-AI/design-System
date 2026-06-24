import path from "path";

const nextConfig = {
  transpilePackages: ["@alphacode-ai/design-system"],
  turbopack: {
    root: path.resolve(import.meta.dirname, ".."),
  },
};
export default nextConfig;
