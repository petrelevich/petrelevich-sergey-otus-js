var fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

const rootPath = process.argv[2];
const PATH_SEPARATOR = require('path').sep;

const getFullName = (path, item) => {
    return `${path}${PATH_SEPARATOR}${item}`;
};

const isDir = (path, item) => {
    return fs.lstatSync(getFullName(path, item)).isDirectory();
};

const results = {files:[], dirs: []};

const dirList = (path) => {
    return new Promise((resolve) => {
        fs.readdir(path, function(err, items) {
            let innerPromise = undefined;
            items.forEach(item => {
                if (isDir(path, item)) {
                    results.dirs.push(getFullName(path, item));
                    innerPromise = dirList(getFullName(path, item));
                } else {
                    results.files.push(getFullName(path, item));
                }
            });

            if (innerPromise !== undefined) {
                innerPromise.then(() => { resolve(results) });
            } else {
                resolve();
            }
        });
    })
};

dirList(rootPath).then(console.log);