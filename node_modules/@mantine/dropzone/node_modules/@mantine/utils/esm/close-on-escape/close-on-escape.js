import { noop } from '../noop/noop.js';

function closeOnEscape(callback, options = { active: true }) {
  if (typeof callback !== "function" || !options.active) {
    return options.onKeyDown || noop;
  }
  return (event) => {
    var _a;
    if (event.key === "Escape") {
      callback(event);
      (_a = options.onTrigger) == null ? void 0 : _a.call(options);
    }
  };
}

export { closeOnEscape };
//# sourceMappingURL=close-on-escape.js.map
