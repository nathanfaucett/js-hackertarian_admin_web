var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    arrayMap = require("@nathanfaucett/array-map"),
    Link = require("virt-ui-link"),
    List = require("virt-ui-list"),
    ListItem = require("virt-ui-list_item"),
    app = require("../../app"),
    MenuStore = require("../../stores/MenuStore");


var MENU_ITEMS = [],
    MenuPrototype;


module.exports = Menu;


function Menu(props, children, context) {

    virt.Component.call(this, props, children, context);

    this.state = {
        menuItems: MENU_ITEMS
    };
}
virt.Component.extend(Menu, "Menu");

MenuPrototype = Menu.prototype;

Menu.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

MenuPrototype.getStyles = function() {
    var styles = {
        root: {
            textAlign: "left",
            position: "relative"
        },
        menuItem: {
            display: "inline-block"
        }
    };

    return styles;
};

MenuPrototype.createOnClick = function(href) {
    return function onClick() {
        app.dispatchAction({
            type: MenuStore.consts.OPEN,
            open: false
        });
        app.page.go(href);
    };
};

MenuPrototype.render = function() {
    var _this = this,
        i18n = this.context.i18n,
        styles = this.getStyles(),
        menuItems = this.state.menuItems.slice();

    return (
        virt.createView("div", {
                className: "Menu",
                style: styles.root
            },
            virt.createView(List,
                arrayMap(menuItems, function each(menuItem) {
                    return virt.createView(ListItem, {
                            onClick: _this.createOnClick(menuItem.href)
                        },
                        virt.createView(Link, {
                                style: styles.menuItem
                            },
                            i18n(menuItem.name)
                        )
                    );
                })
            )
        )
    );
};