var app = require("../app"),
    FormStore = require("./FormStore");


var SignInStore = module.exports = new FormStore("SignInStore", {
    email: "",
    password: ""
});


app.registerStore(SignInStore);