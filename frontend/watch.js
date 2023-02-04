import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';


async function wathcJs() {
    const context = await esbuild.context({
        entryPoints: ['./src/main.js'],
        outfile: './dist/main.js',
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    });
    return context.watch();
}

async function wathcCss() {
    const context = await esbuild.context({
        entryPoints: ['./src/main.css'],
        outfile: './dist/main.css',
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    });
    return context.watch();
}

async function watchHtml() {
    fs.watch('./src/index.html', (eventType, filename) => {
        if (eventType === 'change') {
            fsPromises.copyFile(
                `./src/${filename}`,
                `./dist/${filename}`,   
            );
        }
    });
    return Promise.resolve();
}

function build() {
    return Promise.all([
        wathcJs(),
        wathcCss(),
        watchHtml(),
    ]);
}

build()
    .then(() => {
        console.log('watching...');
    })
    .catch((e) => {
        console.error(e);
    });