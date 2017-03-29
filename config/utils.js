var extend = require("@nathanfaucett/extend"),
    os = require("os");


var utils = exports;


function loadModule(path) {
    var fullPath = require.resolve(path);
    delete require.cache[fullPath];
    return require(fullPath);
}

utils.loadSettings = function(env) {
    return extend({}, loadModule("./settings/default"), loadModule("./settings/" + env));
};

utils.loadPaths = function(env) {
    return extend({}, loadModule("./paths/default"), loadModule("./paths/" + env));
};

utils.getLocalAddress = function() {
    var interfaces = os.networkInterfaces(),
        key, k, inter, address;

    for (key in interfaces) {
        inter = interfaces[key];

        for (k in inter) {
            address = inter[k];

            if (address.family === "IPv4" && !address.internal) {
                return address.address;
            }
        }
    }

    return "localhost";
}
