const esbuild = require("esbuild");

esbuild.build({
    entryPoints: ["src/app/(app)/(auth)/auth-code-error/page.tsx"],
    outfile: "dist/page.js",
    bundle: true,
    format: "esm",
    platform: "browser",
}).catch(() => process.exit(1));