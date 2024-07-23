import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
    {
        test: {
            ...configDefaults
        },
        plugins: [tsconfigPaths()]
    },
    defineConfig({
        test: {
            exclude: [
                ...configDefaults.exclude,
                "**/node_modules/**",
                "**/.db-data/**"
            ]
        }
    })
);
