import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: [
        "express",
        "cors",
        "helmet",
        "@elizaos/core",
        "@elizaos/agent"
    ],
    noExternal: ["express-validator"]
});