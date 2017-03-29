var del = require("del");


module.exports = function(config) {
    return function () {
        return del([
            config.paths.build,
            config.paths.ejs_out,
            config.paths.js_out,
            config.paths.js_map_out,
            config.paths.css_out,
            config.paths.locale_out
        ]);
    };
};
