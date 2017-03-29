var fileUtils = require("@nathanfaucett/file_utils");


module.exports = function(config) {
    return function(done) {
        fileUtils.writeFile(
            config.paths.js + "/config.js",
            "module.exports = " + JSON.stringify(config.utils.loadSettings(config.env), null, 4) + ";\n",
            done
        );
    };
};
