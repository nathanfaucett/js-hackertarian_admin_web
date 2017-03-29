var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    List = require("virt-ui-list"),
    ListItem = require("virt-ui-list_item"),
    FontIcon = require("virt-ui-font_icon"),
    app = require("../../app"),
    MenuStore = require("../../stores/MenuStore");


var UserMenuPrototype;


module.exports = UserMenu;


function UserMenu(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(UserMenu, "UserMenu");

UserMenuPrototype = UserMenu.prototype;

UserMenu.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

UserMenuPrototype.createOnClick = function(href) {
    return function onClick() {
        app.dispatchAction({
            type: MenuStore.consts.OPEN,
            open: false
        });
        app.page.go(href);
    };
};

UserMenuPrototype.getStyles = function() {
    var styles = {
        root: {
            textAlign: "left"
        },
        menuItemP: {
            fontSize: "1em",
            lineHeight: "1em",
            margin: "0px"
        }
    };

    return styles;
};

UserMenuPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "UserMenu",
                style: styles.root
            },
            virt.createView(List,
                virt.createView(ListItem, {
                        onClick: this.createOnClick("/sign_out"),
                        rightIcon: virt.createView(FontIcon, {
                            className: "material-icons"
                        }, "power_settings_new")
                    },
                    virt.createView("p", {
                        style: styles.menuItemP
                    }, "Sign out")
                )
            )
        )
    );
};