var has = require("@nathanfaucett/has"),
    constantize = require("@nathanfaucett/constantize"),
    getPrototypeOf = require("@nathanfaucett/get_prototype_of"),
    apt = require("@nathanfaucett/apt");


var Store = apt.Store,
    EVENT_CHANGE = "change";


module.exports = FormStore;


function FormStore(name, initial) {
    var _form = initial,
        _this = this,
        CHANGE = constantize(name).replace("_STORE", "") + "_CHANGE";

    Store.call(this);

    function update(key, value) {
        if (has(_form, key) && _form[key] !== value) {
            _form[key] = value;
            return true;
        } else {
            return false;
        }
    }

    this.consts.CHANGE = CHANGE;

    this.get = function(name) {
        return _form[name];
    };

    this.clear = function() {
        var form = _form,
            key;

        for (key in form) {
            if (has(form, key)) {
                form[key] = "";
            }
        }
    };

    this.toJSON = function() {
        return _form;
    };

    this.fromJSON = function(json) {
        _form = json;
    };

    this.handler = function(action) {
        if (action.type === _this.consts.CHANGE) {
            if (update(action.name, action.value)) {
                _this.emit(EVENT_CHANGE, action.name, action.value);
            }
        }
    };

    this.storeName = getPrototypeOf(this).storeName = "HackertarianAdmin." + name;
}
Store.extend(FormStore, "HackertarianAdmin.FormStore", []);