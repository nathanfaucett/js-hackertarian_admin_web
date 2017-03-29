var vfs = require("vinyl-fs"),
    filePath = require("@nathanfaucett/file_path"),
    cleanCSS = require("gulp-clean-css");


module.exports = function(config) {
    return function() {
        return vfs.src(config.paths.css_out)
            .pipe(cleanCSS({
                compatibility: "ie8"
            }))
            .pipe(vfs.dest(filePath.dir(config.paths.css_out)));
    };
};
