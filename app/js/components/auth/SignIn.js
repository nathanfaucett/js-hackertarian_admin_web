var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    trim = require("@nathanfaucett/trim"),
    propTypes = require("@nathanfaucett/prop_types"),
    TextField = require("virt-ui-text_field"),
    RaisedButton = require("virt-ui-raised_button"),
    app = require("../../app"),
    UserStore = require("../../stores/UserStore"),
    SignInStore = require("../../stores/SignInStore");


var SignInPrototype;


module.exports = SignIn;


function SignIn(props, context) {
    var _this = this;

    virt.Component.call(this, props, context);

    this.state = {
        email: SignInStore.get("email"),
        password: SignInStore.get("password")
    };

    this.onSignIn = function(errors) {
        _this._onSignIn(errors);
    };

    this.onSubmit = function(e) {
        _this._onSubmit(e);
    };

    this.onInput = function(name, value) {
        _this._onInput(name, value);
    };

    this.onChange = function(e) {
        _this._onChange(e);
    };
}
virt.Component.extend(SignIn, "SignIn");
SignInPrototype = SignIn.prototype;

SignIn.contextTypes = {
    i18n: propTypes.func.isRequired
};

SignInPrototype.displayName = "SignIn";

SignInPrototype.componentDidMount = function() {
    UserStore.on("onSignIn", this.onSignIn);
    SignInStore.addChangeListener(this.onInput);
};

SignInPrototype.componentWillUnmount = function() {
    UserStore.off("onSignIn", this.onSignIn);
    SignInStore.removeChangeListener(this.onInput);
};

SignInPrototype._onSubmit = function(e) {
    var i18n = this.context.i18n,
        refs = this.refs,
        errors = false,
        email, password;

    e.preventDefault();

    email = trim(this.state.email);
    password = trim(this.state.password);

    if (!email) {
        errors = true;
        refs.email.setErrorText(i18n("errors.sign_in.invalid_email"));
    }
    if (!password) {
        errors = true;
        refs.password.setErrorText(i18n("errors.sign_in.invalid_password"));
    }

    if (errors === false) {
        app.dispatchAction({
            type: UserStore.consts.SIGN_IN,
            email: email,
            password: password
        });
    }
};

SignInPrototype._onSignIn = function(errors) {
    if (!errors) {
        app.page.go("/");
    }
};

SignInPrototype._onInput = function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
};

SignInPrototype._onChange = function(e) {
    var currentTarget = e.currentTarget,
        name = currentTarget.getAttribute("name"),
        value = currentTarget.value;

    app.dispatchAction({
        type: SignInStore.consts.CHANGE,
        name: name,
        value: value
    });
};

SignInPrototype.getStyles = function() {
    var styles = {
        root: {
            textAlign: "center",
            padding: "16px",
            background: css.colors.white
        },
        signIn: {
            width: "256px"
        },
        input: {
            marginTop: "16px",
            marginBottom: "64px"
        },
        lastInput: {
            marginBottom: "24px"
        }
    };

    return styles;
};

SignInPrototype.render = function() {
    var styles = this.getStyles(),
        i18n = this.context.i18n;

    return (
        virt.createView("div", {
                className: "SignIn",
                style: styles.root
            },
            virt.createView("h2", null,
                i18n("sign_in.sign_in")
            ),
            virt.createView("form", {
                    className: "grid",
                    onSubmit: this.onSubmit
                },
                virt.createView("div", {
                        className: "email"
                    },
                    virt.createView(TextField, {
                        ref: "email",
                        type: "text",
                        name: "email",
                        value: this.state.email,
                        onChange: this.onChange,
                        placeholder: i18n("sign_in.email")
                    })
                ),
                virt.createView("div", {
                        className: "password",
                        style: styles.lastInput
                    },
                    virt.createView(TextField, {
                        ref: "password",
                        type: "password",
                        name: "password",
                        value: this.state.password,
                        onChange: this.onChange,
                        placeholder: i18n("sign_in.password")
                    })
                ),
                virt.createView("div", {
                        style: styles.input
                    },
                    virt.createView(RaisedButton, {
                        style: styles.signIn,
                        onClick: this.onSubmit
                    }, i18n("sign_in.sign_in"))
                )
            )
        )
    );
};