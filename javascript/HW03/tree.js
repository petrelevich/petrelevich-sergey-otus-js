var dirFunctions = require('./dirFunctions');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

const rootPath = process.argv[2];

dirFunctions.dirList(rootPath, (err, results) => {
        if (err) {
            console.log("error:" + err);
        }
        console.log(results)
    });