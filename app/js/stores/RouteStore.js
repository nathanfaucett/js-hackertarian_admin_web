var apt = require("@nathanfaucett/apt"),
    app = require("../app");


var Store = apt.Store,
    RouteStorePrototype;


function RouteStore() {

    Store.call(this);

    this.data = {
        context: {},
        state: null
    };
}
Store.extend(RouteStore, "HackertarianAdmin.RouteStore", [
    "CHANGE",
    "UPDATE"
]);
RouteStorePrototype = RouteStore.prototype;


function RouteStore_update(_this, ctx, state) {
    var data = _this.data,
        context = data.context;

    context.fullUrl = ctx.fullUrl;
    context.pathname = ctx.pathname;
    context.query = ctx.query;
    context.params = ctx.params;

    data.state = state;
}

function RouteStore_handleContext(_this, ctx) {
    app.router.handler(ctx, function onHandle(error) {
        if (error) {
            throw error;
        }
    });
}

RouteStorePrototype.getState = function() {
    return this.data.state;
};

RouteStorePrototype.getContext = function() {
    return this.data.context;
};

RouteStorePrototype.toJSON = function() {
    return this.data;
};

RouteStorePrototype.fromJSON = function(json) {
    this.data = json;
};

RouteStorePrototype.handler = function(action) {
    var consts = this.consts;

    switch (action.type) {
        case consts.CHANGE:
            RouteStore_handleContext(this, action.ctx);
            break;
        case consts.UPDATE:
            RouteStore_update(this, action.ctx, action.state);
            this.emitChange();
            break;
    }
};


module.exports = new RouteStore();