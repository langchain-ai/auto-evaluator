import React, { Children } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import useStyles from './MediaQuery.styles.js';

function MediaQuery(props) {
  var _a;
  const { children, smallerThan, largerThan, query, styles, className } = useComponentDefaultProps("MediaQuery", {}, props);
  const { classes, cx } = useStyles({ smallerThan, largerThan, query, styles }, { name: "MediaQuery" });
  const child = Children.only(children);
  if (typeof child === "object" && child !== null && "props" in child) {
    return React.cloneElement(child, {
      className: cx(classes.media, (_a = child.props) == null ? void 0 : _a.className, className)
    });
  }
  return child;
}
MediaQuery.displayName = "@mantine/core/MediaQuery";

export { MediaQuery };
//# sourceMappingURL=MediaQuery.js.map
