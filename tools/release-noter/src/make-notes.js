const fs = require('fs');

module.exports = function (path, text) {
    fs.writeFile(path, text, err => {
        if (err) { throw err };
        console.log('Saved!');
    })
}