var fs = require('fs');
var path = require('path');

const dirList = (dir, done) => {
    let results = {files:[], dirs: []};

    fs.readdir(dir, function(err, itemList) {
        if (err) {
            return done(err);
        }

        let itemsForProcess = itemList.length;

        if (!itemsForProcess) {
            return done(null, results);
        }

        itemList.forEach((file) => {
            file = path.resolve(dir, file);

            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    results.dirs.push(file);
                    dirList(file, (err, res) => {
                        results.dirs = results.dirs.concat(res.dirs);
                        results.files = results.files.concat(res.files);
                        if (!--itemsForProcess) {
                            done(null, results);
                        }
                    });
                } else {
                    results.files.push(file);
                    if (!--itemsForProcess) {
                        done(null, results);
                    }
                }
            });
        });
    });
};

module.exports = {
    dirList: dirList
};