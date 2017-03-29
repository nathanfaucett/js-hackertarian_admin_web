var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    Nav = require("../Nav"),
    Footer = require("../Footer");


var LayoutAppPrototype;


module.exports = LayoutApp;


function LayoutApp(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(LayoutApp, "LayoutApp");
LayoutAppPrototype = LayoutApp.prototype;

LayoutApp.propTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired,
    render: propTypes.func.isRequired
};

LayoutApp.contextTypes = {
    theme: propTypes.object.isRequired
};

LayoutApp.childContextTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

LayoutAppPrototype.getChildContext = function() {
    return {
        ctx: this.props.ctx,
        i18n: this.props.i18n
    };
};

LayoutAppPrototype.getStyles = function() {
    var theme = this.context.theme,
        styles = {
            background: {
                background: theme.palette.canvasColor
            }
        };

    return styles;
};

LayoutAppPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "LayoutApp",
                style: styles.background
            },
            virt.createView(Nav),
            this.props.render(this.props.ctx),
            virt.createView(Footer)
        )
    );
};