var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    Wrapper = require("./Wrapper");


var FooterPrototype;


module.exports = Footer;


function Footer(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Footer, "Footer");

Footer.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

FooterPrototype = Footer.prototype;

FooterPrototype.getStyles = function() {
    var styles = {
        root: {}
    };

    return styles;
};

FooterPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Footer",
                style: styles.root
            },
            virt.createView(Wrapper)
        )
    );
};