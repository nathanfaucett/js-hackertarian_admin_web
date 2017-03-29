var app = require("../../../app"),
    HEADER_TOKEN = require("../../../consts/HEADER_TOKEN"),
    UserStore = require("../../../stores/UserStore");


module.exports = autoTokenSignIn;


function autoTokenSignIn(ctx, next) {
    app.getCookie(HEADER_TOKEN, function onGetCookie(error, token) {
        var user = UserStore.user;

        if (token && token !== user.token) {
            UserStore.signInWithApiToken({
                token: token
            }, function(error) {
                if (error) {
                    app.page.go("/sign_in");
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });
}