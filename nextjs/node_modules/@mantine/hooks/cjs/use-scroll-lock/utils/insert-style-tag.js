'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function insertStyleTag(tag) {
  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}

exports.insertStyleTag = insertStyleTag;
//# sourceMappingURL=insert-style-tag.js.map
