var RouteStore = require("../stores/RouteStore"),
    app = require("../app");


app.router.route(
    "/",
    function routeRoot(ctx, next) {
        app.dispatchAction({
            type: RouteStore.consts.UPDATE,
            state: "home",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);