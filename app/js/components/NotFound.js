var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    Wrapper = require("./Wrapper");


var NotFoundPrototype;


module.exports = NotFound;


function NotFound(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(NotFound, "NotFound");

NotFoundPrototype = NotFound.prototype;

NotFound.contextTypes = {
    i18n: propTypes.func.isRequired,
    ctx: propTypes.object.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

NotFoundPrototype.getStyles = function() {
    var styles = {
        root: {}
    };

    return styles;
};

NotFoundPrototype.render = function() {
    var context = this.context,
        i18n = context.i18n,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "NotFound",
                style: styles.root
            },
            virt.createView(Wrapper,
                virt.createView("h1", {
                        style: styles.h1
                    },
                    i18n("errors.not_found")
                )
            )
        )
    );
};