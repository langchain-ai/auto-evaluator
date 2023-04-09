"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class DefaultFileReader {
    async read(dir) {
        const pathnames = [];
        let directories = [
            dir
        ];
        while(directories.length > 0){
            // Load all the files in each directory at the same time.
            const results = await Promise.all(directories.map(async (directory)=>{
                let files;
                try {
                    files = await _promises.default.readdir(directory, {
                        withFileTypes: true
                    });
                } catch (err) {
                    // This can only happen when the underlying directory was removed. If
                    // anything other than this error occurs, re-throw it.
                    if (err.code !== "ENOENT") throw err;
                    // The error occurred, so abandon reading this directory.
                    files = [];
                }
                return {
                    directory,
                    files
                };
            }));
            // Empty the directories, we'll fill it later if some of the files are
            // directories.
            directories = [];
            // For each result of directory scans...
            for (const { files: files1 , directory: directory1  } of results){
                // And for each file in it...
                for (const file of files1){
                    // Handle each file.
                    const pathname = _path.default.join(directory1, file.name);
                    // If the file is a directory, then add it to the list of directories,
                    // they'll be scanned on a later pass.
                    if (file.isDirectory()) {
                        directories.push(pathname);
                    } else {
                        pathnames.push(pathname);
                    }
                }
            }
        }
        return pathnames;
    }
}
exports.DefaultFileReader = DefaultFileReader;

//# sourceMappingURL=default-file-reader.js.map