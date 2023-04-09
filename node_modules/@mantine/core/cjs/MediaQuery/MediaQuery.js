'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var MediaQuery_styles = require('./MediaQuery.styles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function MediaQuery(props) {
  var _a;
  const { children, smallerThan, largerThan, query, styles: styles$1, className } = styles.useComponentDefaultProps("MediaQuery", {}, props);
  const { classes, cx } = MediaQuery_styles['default']({ smallerThan, largerThan, query, styles: styles$1 }, { name: "MediaQuery" });
  const child = React.Children.only(children);
  if (typeof child === "object" && child !== null && "props" in child) {
    return React__default.cloneElement(child, {
      className: cx(classes.media, (_a = child.props) == null ? void 0 : _a.className, className)
    });
  }
  return child;
}
MediaQuery.displayName = "@mantine/core/MediaQuery";

exports.MediaQuery = MediaQuery;
//# sourceMappingURL=MediaQuery.js.map
