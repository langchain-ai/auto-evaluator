'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fontStyles = require('./font-styles/font-styles.js');
var focusStyles = require('./focus-styles/focus-styles.js');
var themeColor = require('./theme-color/theme-color.js');
var gradient = require('./gradient/gradient.js');
var breakpoints = require('./breakpoints/breakpoints.js');
var rgba = require('./rgba/rgba.js');
var cover = require('./cover/cover.js');
var darken = require('./darken/darken.js');
var lighten = require('./lighten/lighten.js');
var radius = require('./radius/radius.js');
var variant = require('./variant/variant.js');
var primaryShade = require('./primary-shade/primary-shade.js');
var primaryColor = require('./primary-color/primary-color.js');
var hover = require('./hover/hover.js');
var placeholderStyles = require('./placeholder-styles/placeholder-styles.js');
var dimmed = require('./dimmed/dimmed.js');

const fns = {
  fontStyles: fontStyles.fontStyles,
  themeColor: themeColor.themeColor,
  focusStyles: focusStyles.focusStyles,
  linearGradient: gradient.linearGradient,
  radialGradient: gradient.radialGradient,
  smallerThan: breakpoints.smallerThan,
  largerThan: breakpoints.largerThan,
  rgba: rgba.rgba,
  cover: cover.cover,
  darken: darken.darken,
  lighten: lighten.lighten,
  radius: radius.radius,
  variant: variant.variant,
  primaryShade: primaryShade.primaryShade,
  hover: hover.hover,
  gradient: gradient.gradient,
  primaryColor: primaryColor.primaryColor,
  placeholderStyles: placeholderStyles.placeholderStyles,
  dimmed: dimmed.dimmed
};

exports.fns = fns;
//# sourceMappingURL=index.js.map
