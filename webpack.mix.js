const fs = require('fs')
const mix = require('laravel-mix')

function compile(directory) {
    let srcPath = `./src/${directory}`
    let destPath = `./${directory}`

    let files = fs.readdirSync(srcPath, { withFileTypes: true })
    files.filter((file) => { return file.isDirectory() })
        .forEach((file) => {
            mix.copy(`${srcPath}/${file.name}/**/*.html`, `${destPath}/${file.name}`)
                .js(`${srcPath}/${file.name}/app.js`, `${destPath}/${file.name}`)
                .vue()
                .postCss(`./src/shared/styles/app.css`, `${destPath}/${file.name}/`, [
                    require('tailwindcss')
                ])
        })
}

let directories = ['dashboard', 'graphics']
directories.forEach(compile)

if (fs.existsSync('./src/extension/index.js')) {
    mix.js('src/extension/index.js', 'extension')
}
