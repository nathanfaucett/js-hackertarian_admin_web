var apt = require("@nathanfaucett/apt");


var Store = apt.Store,
    MenuStorePrototype;


function MenuStore() {

    Store.call(this);

    this.open = true;
}
Store.extend(MenuStore, "HackertarianAdmin.MenuStore", [
    "OPEN"
]);
MenuStorePrototype = MenuStore.prototype;

MenuStorePrototype.toJSON = function() {
    return {
        open: this.open
    };
};

MenuStorePrototype.fromJSON = function(json) {
    this.open = json.open;
    return this;
};

MenuStorePrototype.getOpen = function() {
    return this.open;
};

MenuStorePrototype.setOpen = function(open) {
    this.open = open;
    return this;
};

MenuStorePrototype.handler = function(action) {
    var consts = this.consts;

    switch (action.type) {
        case consts.OPEN:
            this.setOpen(action.open);
            this.emitChange();
            break;
    }
};


module.exports = new MenuStore();