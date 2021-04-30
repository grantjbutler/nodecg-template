const fs = require('fs')
const mix = require('laravel-mix')
const path = require('path')

if (fs.existsSync('./src/shared/')) {
    mix.alias({
        '@': path.join(__dirname, 'src', 'shared')
    })
}

mix.setPublicPath('.');

function compile(directory) {
    let srcPath = `./src/${directory}`
    let destPath = `./${directory}`

    let files = fs.readdirSync(srcPath, { withFileTypes: true })
    files.filter((file) => { return file.isDirectory() })
        .forEach((file) => {
            mix.copy(`${srcPath}/${file.name}/**/*.html`, `${destPath}/${file.name}`)
            
            if (fs.existsSync(`${srcPath}/${file.name}/app.css`)) {
                mix.postCss(`${srcPath}/${file.name}/app.css`, `${destPath}/${file.name}/`, {
                    processCssUrls: false
                }, [
                    require('tailwindcss')
                ])
            }

            if (fs.existsSync(`${srcPath}/${file.name}/app.js`)) {
                mix.js(`${srcPath}/${file.name}/app.js`, `${destPath}/${file.name}/`)
                    .vue()
            }

            if (fs.existsSync(`${srcPath}/${file.name}/img/`)) {
                mix.copy(`${srcPath}/${file.name}/img/`, `${destPath}/${file.name}/img/`)
            }
        })
}

let directories = ['dashboard', 'graphics']
directories.forEach(compile)

if (fs.existsSync('./src/extension/index.js')) {
    mix.copy('src/extension/**/*.js', 'extension')
}
