var virt = require("@nathanfaucett/virt"),
    app = require("../app"),
    LayoutApp = require("../components/layouts/LayoutApp"),
    NotFound = require("../components/NotFound");


app.registerPage("not_found", function renderNotFoundPage(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function onRender() {
                return virt.createView(NotFound);
            }
        })
    );
});