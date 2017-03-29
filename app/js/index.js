var environment = require("@nathanfaucett/environment"),
    eventListener = require("@nathanfaucett/event_listener"),

    app = require("./app"),
    initClient = require("./client"),
    initServer = require("./server");


eventListener.on(environment.window, "load DOMContentLoaded", function() {
    initServer(initClient(app));
});