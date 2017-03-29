var UserStore = require("../../stores/UserStore"),
    app = require("../../app");


app.router.route(
    "/sign_out",
    function routeSignOut( /* ctx */ ) {
        app.dispatchAction({
            type: UserStore.consts.SIGN_OUT
        });
        app.page.go("/sign_in");
    }
);