const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/components/shared/hero.tsx"],
  outfile: "dist/Hero.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  external: ["react", "react-dom"],
  minify: true,
});