var app = require("../../../app"),
    UserStore = require("../../../stores/UserStore");


module.exports = redirect;


function redirect(ctx, next) {
    var pathname = ctx.pathname;

    if (!UserStore.isSignedIn() && pathname !== "/sign_in") {
        app.page.go("/sign_in");
    } else {
        next();
    }
}