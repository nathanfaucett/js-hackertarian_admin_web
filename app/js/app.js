var apt = require("@nathanfaucett/apt"),
    page = require("@nathanfaucett/page/src/server"),
    request = require("@nathanfaucett/request"),
    i18n = require("@nathanfaucett/i18n"),

    router = require("./router"),

    i18nBound, RouteStore, UserStore;


var Application = apt.Application,
    app, HackertarianAdminApplicationPrototype;


function HackertarianAdminApplication() {

    Application.call(this);

    this.router = router;

    this.config = null;
    this.Component = null;
    this.page = page;
    this.i18n = null;
    this.messenger = null;

    this.pages = {};
}
Application.extend(HackertarianAdminApplication, "HackertarianAdmin.Application");
HackertarianAdminApplicationPrototype = HackertarianAdminApplication.prototype;


app = module.exports = new HackertarianAdminApplication();


app.Component = require("./components/App");
i18nBound = require("./utils/i18n");
RouteStore = require("./stores/RouteStore");
UserStore = require("./stores/UserStore");


HackertarianAdminApplicationPrototype.init = function(config, messenger) {
    var _this = this,
        dispatcher = this.dispatcher;

    this.i18n = i18nBound;
    this.router = router;

    this.config = config;
    this.messenger = messenger;

    request.defaults.headers.Accept = "application/json";
    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = true;

    this.registerStore(RouteStore);
    this.registerStore(UserStore);
    this.registerStore(require("./stores/MenuStore"));

    page.initServer(messenger);
    page.on("request", function onRequest(ctx) {
        dispatcher.dispatch({
            type: RouteStore.consts.CHANGE,
            ctx: ctx
        });
    });

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.throwMissingError(config.throwMissingTranslationError);

    dispatcher.on("dispatch", function onDispatch() {
        _this.setCookie("HackertarianAdmin.state", _this.toJSON());
    });

    this.messenger.on("HackertarianAdmin.clientReady", function onRestoreState(data, callback) {
        _this.fromJSON(data);
        _this.emit("init");
        callback();
    });

    page.setHtml5Mode(config.html5Mode, function onSetHtml5Mode() {
        messenger.emit("HackertarianAdmin.serverReady");
    });
};

HackertarianAdminApplicationPrototype.setCookie = function(key, value, callback) {
    this.messenger.emit("HackertarianAdmin.setCookie", {
        key: key,
        value: value
    }, callback);
};
HackertarianAdminApplicationPrototype.hasCookie = function(key, callback) {
    this.messenger.emit("HackertarianAdmin.hasCookie", {
        key: key
    }, callback);
};
HackertarianAdminApplicationPrototype.getCookie = function(key, callback) {
    this.messenger.emit("HackertarianAdmin.getCookie", {
        key: key
    }, callback);
};
HackertarianAdminApplicationPrototype.removeCookie = function(key, callback) {
    this.messenger.emit("HackertarianAdmin.removeCookie", {
        key: key
    }, callback);
};

HackertarianAdminApplicationPrototype.setLocale = function(value, callback) {
    this.messenger.emit("HackertarianAdmin.setLocale", {
        value: value
    }, callback);
};
HackertarianAdminApplicationPrototype.getLocale = function(callback) {
    this.messenger.emit("HackertarianAdmin.getLocale", null, callback);
};

HackertarianAdminApplicationPrototype.registerPage = function(name, render) {
    this.pages[name] = render;
};

HackertarianAdminApplicationPrototype.getPage = function(name) {
    return this.pages[name];
};

require("./views");
require("./routes");