var fs = require("fs"),
    path = require("@nathanfaucett/file_path"),
    extend = require("@nathanfaucett/extend"),
    flattenObject = require("@nathanfaucett/flatten_object"),
    objectForEach = require("@nathanfaucett/object-for_each"),
    filePath = require("@nathanfaucett/file_path"),
    fileUtils = require("@nathanfaucett/file_utils");


module.exports = function(config) {
    return function(callback) {
        var locales = config.settings.locales,
            flatLocaleMode = config.settings.flatLocaleMode,
            length = locales.length,
            called = false;

        function done(err) {
            if (called !== true) {
                if (--length === 0 || err) {
                    called = true;
                    callback(err);
                }
            }
        }

        objectForEach(locales, function(locale) {
            var localeObject = {};

            fileUtils.dive(path.join(config.paths.locale, locale), function(stat, next) {
                fs.readFile(stat.path, function(err, buffer) {
                    var json;

                    if (err) {
                        next(err);
                    } else {
                        try{
                            json = JSON.parse(buffer.toString());
                        } catch(e) {
                            next(e);
                            return;
                        }

                        if (flatLocaleMode) {
                            json = flattenObject(json);
                        }

                        extend(localeObject, json);

                        next();
                    }
                });
            }, function(error) {
                if (error) {
                    done(error);
                } else {
                    fileUtils.writeFile(
                        filePath.join(config.paths.locale_out, locale + ".json"),
                        JSON.stringify(localeObject, null, 2),
                        done
                    );
                }
            });
        });
    };
};
