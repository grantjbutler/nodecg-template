const { fork } = require('child_process')
const rimraf = require('rimraf')
const fs = require('fs')

const isProduction = process.env.NODE_ENV === 'production'
const command = isProduction ? 'build' : 'watch';

['dashboard', 'graphics'].forEach((directory) => {
    rimraf(`./${directory}`, function () {
        fs.readdir(`./src/${directory}`, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.log(`Error fetching files: ${err}`)
                return
            }

            files.filter((file) => { return file.isDirectory() })
                .forEach((file) => {
                    console.log(`Forking build process for ${file.name}`)
                    
                    let args = [
                        '--dist-dir',
                        `./${directory}/${file.name}/`,
                        '--public-url',
                        '.'
                    ]

                    if (isProduction) {
                        args.push('--no-cache')
                    }

                    fork('node_modules/.bin/parcel', [
                        command,
                        ...args,
                        `./src/${directory}/${file.name}/index.html`
                    ])
                })
        })
    })
})

rimraf('./extension', function() {
    if (!fs.existsSync('./src/extension/index.js')) {
        return;
    }
    
    fork('node_modules/.bin/parcel', [
        command,
        'src/extension/index.js',
        '--dist-dir',
        'extension',
        '--public-url',
        '.',
        '--target',
        'node'
    ]);
})