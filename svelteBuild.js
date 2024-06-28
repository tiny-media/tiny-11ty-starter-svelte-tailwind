import { compile } from 'svelte/compiler';
import chokidar from 'chokidar';
import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob'; // Import the glob library

async function compileSvelte(filePath) {
  const source = await fs.readFile(filePath, 'utf-8');
  const { js, css, warnings } = compile(source, {
    filename: path.basename(filePath),
    customElement: true, // Add customElement option
  });

  for (const warning of warnings) {
    console.warn('Svelte warning:', warning);
  }

  return { js, css };
}

async function build() {
  const files = ['11ty/js/svelte/**/*.svelte']; // Adjust the path to your Svelte files

  const entryPoints = (await Promise.all(
    files.map(async (pattern) => {
      const entries = await glob(pattern);
      return entries;
    })
  )).flat();

  const promises = entryPoints.map(async (file) => {
    const { js, css } = await compileSvelte(file);
    const outFile = `11ty/js/svelte-compiled/${path.basename(file, '.svelte')}.js`;

    await fs.writeFile(outFile, js.code, 'utf-8');
    console.log(`Compiled ${file} to ${outFile}`);

    if (css && css.code) { // Ensure css is not null before accessing css.code
      const cssFile = `dist/${path.basename(file, '.svelte')}.css`;
      await fs.writeFile(cssFile, css.code, 'utf-8');
      console.log(`Compiled ${file} CSS to ${cssFile}`);
    }
  });

  await Promise.all(promises);
}

const watchOptions = {
  persistent: true,
  ignored: /node_modules/,
  ignoreInitial: true,
  followSymlinks: true,
  cwd: '.',
  disableGlobbing: false,
};

chokidar
  .watch('11ty/js/svelte/**/*.svelte', watchOptions)
  .on('add', build)
  .on('change', build)
  .on('unlink', build);

build().catch((err) => {
  console.error(err);
  process.exit(1);
});