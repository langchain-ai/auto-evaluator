'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function dimmed(theme) {
  return () => theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
}

exports.dimmed = dimmed;
//# sourceMappingURL=dimmed.js.map
