var path = require('path');

function baseConfig(currentDirectory) {
    var config = {
        entry: {
            main: './wwwroot/js/main'
        },
        output: {
            publicPath: "/dist/",
            path: path.join(currentDirectory, '/wwwroot/dist/'),
            filename: 'main.build.js'
        }
    };

    return config;
}

module.exports = baseConfig;