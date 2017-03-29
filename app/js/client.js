var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),

    cookies = require("@nathanfaucett/cookies"),
    page = require("@nathanfaucett/page/src/client"),

    environment = require("@nathanfaucett/environment"),

    HEADER_LOCALE = require("./consts/HEADER_LOCALE"),

    config = require("./config");


var document = environment.document,

    navigatorLanguage = (
        navigator.language ||
        (navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase)) ||
        "en"
    );


module.exports = init;


if (config.env !== "production" && config.env !== "staging") {
    global.reset = function() {
        cookies.remove("HackertarianAdmin.state");
        location.reload();
    };
}


function init(app) {
    var root = virtDOM.render(virt.createView(app.Component), document.getElementById("app")),
        messenger = root.adapter.messengerClient;


    page.initClient(messenger);


    messenger.on("HackertarianAdmin.setCookie", function setCookie(data, callback) {
        cookies.set(data.key, data.value);
        callback();
    });
    messenger.on("HackertarianAdmin.hasCookie", function getCookie(data, callback) {
        callback(undefined, cookies.has(data.key));
    });
    messenger.on("HackertarianAdmin.getCookie", function getCookie(data, callback) {
        callback(undefined, cookies.get(data.key));
    });
    messenger.on("HackertarianAdmin.removeCookie", function getCookie(data, callback) {
        callback(undefined, cookies.remove(data.key));
    });

    messenger.on("HackertarianAdmin.setLocale", function setLocale(data, callback) {
        cookies.set(HEADER_LOCALE, data.locale);
        callback();
    });
    messenger.on("HackertarianAdmin.getLocale", function getLocale(data, callback) {
        callback(undefined, cookies.get(HEADER_LOCALE) || navigatorLanguage);
    });

    messenger.on("HackertarianAdmin.serverReady", function onServerReady(data, callback) {
        messenger.emit("HackertarianAdmin.clientReady", cookies.get("HackertarianAdmin.state"), function onReady() {
            page.listen();
        });
        callback();
    });

    return root.adapter.messenger;
}