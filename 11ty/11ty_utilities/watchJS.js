import { build, context } from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import { globSync } from 'glob';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import chokidar from 'chokidar';

async function watchJS() {
    const inputDir = './11ty/js';
    const outputDir = '_site/js';

    // Find all JS, TS, and Svelte files, excluding those starting with an underscore
    const files = globSync(`${inputDir}/**/*.{js,ts,svelte}`, {
        ignore: '**/_*',
    });

    // Ensure the output directory exists
    mkdirSync(outputDir, { recursive: true });

    for (const file of files) {
        const ext = path.extname(file);
        const fileName = `${path.basename(file, ext)}.js`;
        const outputFile = path.join(outputDir, fileName);

        const ctx = await context({
            entryPoints: [file],
            outfile: outputFile,
            minify: false, // Do not minify for development
            bundle: true,
            sourcemap: true,
            target: 'es2020', // Target modern JavaScript
            platform: 'browser',
            plugins: [
                sveltePlugin({
                    compilerOptions: { customElement: true }
                })
            ],
        });
        await ctx.watch(); // Start watching for changes
    }

    // Watch for changes in the input directory
    const watcher = chokidar.watch(`${inputDir}/**/*.{js,ts,svelte}`);

    watcher.on('change', async (file) => {
        // Rebuild relevant entry points for the changed file
        for (const entryFile of files) {
            const entryExt = path.extname(entryFile);
            const entryFileName = `${path.basename(entryFile, entryExt)}.js`;
            const entryOutputFile = path.join(outputDir, entryFileName);

            await build({
                entryPoints: [entryFile],
                outfile: entryOutputFile,
                minify: false, // Do not minify for development
                bundle: true,
                sourcemap: true,
                target: 'es2020', // Target modern JavaScript
                platform: 'browser',
                plugins: [
                    sveltePlugin({
                        compilerOptions: { customElement: true }
                    })
                ],
            }).catch(() => process.exit(1)); // Exit process on failure
        }
    });
}

export default watchJS;