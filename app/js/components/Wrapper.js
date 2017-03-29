var virt = require("@nathanfaucett/virt");


var WrapperPrototype;


module.exports = Wrapper;


function Wrapper(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Wrapper, "Wrapper");
WrapperPrototype = Wrapper.prototype;

WrapperPrototype.getStyles = function() {
    var styles = {
        root: {
            padding: "32px",
            maxWidth: "960px",
            margin: "0 auto"
        }
    };

    return styles;
};

WrapperPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Wrapper",
                style: styles.root
            },
            this.children
        )
    );
};