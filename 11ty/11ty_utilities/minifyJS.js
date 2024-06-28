import { build } from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import { globSync } from 'glob';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

async function minifyJS() {
    const inputDir = './11ty/js';
    const outputDir = '_site/js';

    // Find all JS, TS, and Svelte files, excluding those starting with an underscore
    const files = globSync(`${inputDir}/**/*.{js,ts,svelte}`, {
        ignore: '**/_*',
    });

    // Ensure the output directory exists
    mkdirSync(outputDir, { recursive: true });

    const buildPromises = files.map((file) => {
        const ext = path.extname(file);
        const fileName = `${path.basename(file, ext)}.js`;
        const outputFile = path.join(outputDir, fileName);

        // Build, bundle, and minify the JS/TS/Svelte file
        return build({
            entryPoints: [file],
            outfile: outputFile,
            minify: true,
            bundle: true,
            sourcemap: false, // No sourcemaps for production
            target: 'es2020',
            platform: 'browser',
            plugins: [
                sveltePlugin({
                    compilerOptions: { customElement: true }
                })
            ]
        });
    });

    // Wait for all builds to complete
    await Promise.all(buildPromises).catch(() => process.exit(1)); // Exit process on failure
}

export default minifyJS;