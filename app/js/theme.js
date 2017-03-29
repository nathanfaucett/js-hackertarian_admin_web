var Theme = require("@nathanfaucett/theme"),
    css = require("@nathanfaucett/css");


var HackertarianAdminThemePrototype;


module.exports = HackertarianAdminTheme;


function HackertarianAdminTheme() {

    Theme.call(this);

    this.fontFamily = "Roboto, sans-serif";
}
Theme.extend(HackertarianAdminTheme, "HackertarianAdminTheme");
HackertarianAdminThemePrototype = HackertarianAdminTheme.prototype;

HackertarianAdminThemePrototype.getSpacing = function() {
    return {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopLeftNavMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56
    };
};

HackertarianAdminThemePrototype.getPalette = function() {
    return {
        primaryColor: "#3f51b5",
        secondaryColor: "#607d8b",
        accentColor: "#3f51b5",

        textColor: "rgba(0, 0, 0, 0.87)",
        disabledColor: "rgba(0,0,0,0.12)",
        primaryTextColor: "rgba(0,0,0,0.87)",
        secondaryTextColor: "rgba(0,0,0,0.5)",
        disabledTextColor: "rgba(0,0,0,0.262)",
        lightText: "#FFFFFF",

        level0Color: "#E0E0E0",
        level1Color: "#F5F5F5",
        level2Color: "#FAFAFA",
        level3Color: "#FFFFFF",

        errorColor: "#F44336",
        canvasColor: css.colors.white,
        borderColor: "#6a6a6a"
    };
};

HackertarianAdminThemePrototype.getStyles = function(palette /*, spacing */ ) {
    var styles = {
        link: {
            color: palette.primary2Color,
            hoverColor: palette.accent1Color,
            focusColor: palette.accent1Color,
            downColor: palette.accent1Color
        },
        input: {
            color: palette.textColor,
            borderColor: palette.primary3Color,
            focusBorderColor: palette.accent1Color
        },
        button: {
            color: palette.canvasColor,
            backgroundColor: palette.accent1Color,
            backgroundActiveColor: palette.accent2Color
        },
        panel: {
            backgroundColor: palette.canvasColor,
            borderColor: palette.borderColor
        },
        boxShadow: "1px 2px 8px 0px " + palette.disabledColor
    };
    return styles;
};