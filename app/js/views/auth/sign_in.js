var virt = require("@nathanfaucett/virt"),
    app = require("../../app"),
    LayoutApp = require("../../components/layouts/LayoutApp"),
    SignIn = require("../../components/auth/SignIn");


app.registerPage("sign_in", function(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function() {
                return (
                    virt.createView(SignIn)
                );
            }
        })
    );
});