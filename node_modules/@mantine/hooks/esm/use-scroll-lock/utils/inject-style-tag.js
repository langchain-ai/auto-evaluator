function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}

export { injectStyles };
//# sourceMappingURL=inject-style-tag.js.map
