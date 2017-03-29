var vfs = require("vinyl-fs"),
    task = require("@nathanfaucett/task"),
    livereload = require("@nathanfaucett/livereload"),
    debounce = require("@nathanfaucett/debounce"),
    config = require("./config/application");


task("jshint", "run jshint", require("./config/tasks/jshint")(config));
task("jsbeautifier", "run jsbeautifier", require("./config/tasks/jsbeautifier")(config));

task("default", task.series(task("jsbeautifier"), task("jshint")));


task("config", "compile config to build directory", require("./config/tasks/config")(config));
task("js", "compile js into one file", task.series(task("config"), require("./config/tasks/comn")(config)));

task("css", "compile css into one file", require("./config/tasks/comn_css")(config));
task("ejs", "compile ejs into one file", require("./config/tasks/ejs")(config));


task("locale", "compiles locale files to build directory", require("./config/tasks/locale")(config));

task("clean", "clean build files", require("./config/tasks/clean")(config));


task("copy_imgs", "copys app img to build dir", function copy_imgs() {
    return vfs.src([
        config.paths.img + "/**/*"
    ]).pipe(vfs.dest(config.paths.build + "/img"));
});
task("copy", "copys app fonts to build dir", task.parallel(task("copy_imgs")));


task("serve", "serve build directory", require("./config/tasks/serve")(config));

task("uglify", "uglify build js", require("./config/tasks/uglify")(config));
task("minify_css", "minify build css", require("./config/tasks/minify_css")(config));
task("minify_html", "minify build html", require("./config/tasks/minify_html")(config));
task("minify_json", "minify build json", require("./config/tasks/minify_json")(config));

task("minify", "minify built app", task.parallel(
    task("uglify"),
    task("minify_css"),
    task("minify_html"),
    task("minify_json"))
);


if (config.env !== "production" && config.env !== "staging") {
    task("build", "builds app in " + config.env, task.parallel(task("js"), task("css"), task("ejs"), task("locale")));
} else {
    task("build", "builds app in " + config.env, task.series(
        task.parallel(task("js"), task("css"), task("ejs"), task("copy"), task("locale")),
        task("minify")
    ));
}


var callForReload = debounce(function callForReload() {
    livereload.reload();
}, 16);

function reload(done) {
    callForReload();
    done();
}

task("reload", reload);
task("js_reload", "builds js and calls for a reload", task.series(task("js"), task("reload")));
task("css_reload", "builds css and calls for a reload", task.series(task("css"), task("reload")));
task("ejs_reload", "builds ejs and calls for a reload", task.series(task("ejs"), task("reload")));
task("locale_reload", "builds locale and calls for a reload", task.series(task("locale"), task("reload")));


function watch(files, name) {
	task.watch(files, function onChange() {
        task.run(name, function onRun() {});
    });
}

task("watch", "starts watching for changes on dev files", function(done) {
    watch([
            config.paths.js + "/**/*.js",
            "!" + config.paths.js + "/config.js"
        ], "js_reload"
    );
    watch([config.paths.css + "/**/*.less"], "css_reload");
    watch([config.paths.ejs_src], "ejs_reload");
    watch([config.paths.locale + "/**/*.json"], "locale_reload");
    watch([config.paths.app + "/fonts/**/*", config.paths.app + "/img/**/*"], "reload");
    done();
});


task("run", "builds app and starts watching files", task.series(task("build"), task("watch"), task("serve")));
