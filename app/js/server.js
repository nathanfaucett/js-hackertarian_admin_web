var config = require("./config"),
    app = require("./app");


module.exports = init;


function init(messenger) {
    app.init(config, messenger);
}