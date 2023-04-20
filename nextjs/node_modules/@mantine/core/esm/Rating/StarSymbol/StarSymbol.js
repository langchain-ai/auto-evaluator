import React from 'react';
import { StarIcon } from './StarIcon.js';
import useStyles from './StarSymbol.styles.js';

function StarSymbol({ size, type, color }) {
  const { classes } = useStyles({ type, color }, { name: "Rating", size });
  return /* @__PURE__ */ React.createElement(StarIcon, {
    className: classes.icon
  });
}
StarSymbol.displayName = "@mantine/core/StarSymbol";

export { StarSymbol };
//# sourceMappingURL=StarSymbol.js.map
