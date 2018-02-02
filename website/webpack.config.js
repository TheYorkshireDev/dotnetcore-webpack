var path = require('path');

module.exports = {
    entry: {
        main: './wwwroot/js/main'
    },
    output: {
        publicPath: "/dist/",
        path: path.join(__dirname, '/wwwroot/dist/'),
        filename: 'main.build.js'
    }
};