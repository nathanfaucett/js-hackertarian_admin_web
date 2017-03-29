var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    LeftNav = require("virt-ui-left_nav"),
    FontIcon = require("virt-ui-font_icon"),
    app = require("../../app"),
    UserStore = require("../../stores/UserStore"),
    MenuStore = require("../../stores/MenuStore"),
    Profile = require("./Profile"),
    Menu = require("./Menu"),
    UserMenu = require("./UserMenu");


var NavPrototype;


module.exports = Nav;


function Nav(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        open: MenuStore.getOpen()
    };
    this.onToggle = function() {
        return _this._onToggle();
    };
    this.onOpenChange = function() {
        return _this._onOpenChange();
    };
}
virt.Component.extend(Nav, "Nav");

NavPrototype = Nav.prototype;

Nav.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

NavPrototype.componentDidMount = function() {
    MenuStore.addChangeListener(this.onOpenChange);
};

NavPrototype.componentWillUnmount = function() {
    MenuStore.removeChangeListener(this.onOpenChange);
};

NavPrototype._onToggle = function() {
    app.dispatchAction({
        type: MenuStore.consts.OPEN,
        open: !this.state.open
    });
};

NavPrototype._onOpenChange = function() {
    this.setState({
        open: MenuStore.getOpen()
    });
};

NavPrototype.getStyles = function() {
    var styles = {
        root: {
            position: "relative"
        },
        menuBtn: {
            display: "block",
            position: "absolute",
            top: "8px",
            right: "-32px"
        }
    };

    return styles;
};

NavPrototype.render = function() {
    var styles = this.getStyles(),
        children = [
            virt.createView("div", {
                    onClick: this.onToggle,
                    style: styles.menuBtn
                },
                virt.createView(FontIcon, {
                    className: "material-icons"
                }, "menu")
            ),
            virt.createView(Profile),
            virt.createView(Menu)
        ];

    if (UserStore.isSignedIn()) {
        children.push(
            virt.createView(UserMenu)
        );
    }

    return (
        virt.createView("div", {
                className: "Nav",
                style: styles.root
            },
            virt.createView(LeftNav, {
                    width: 256,
                    docked: false,
                    open: this.state.open,
                    onRequestChange: this.onToggle
                },
                children
            )
        )
    );
};