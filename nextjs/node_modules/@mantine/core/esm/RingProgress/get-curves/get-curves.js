var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function getCurves({
  size,
  thickness,
  sections,
  renderRoundedLineCaps,
  rootColor
}) {
  const sum = sections.reduce((acc, current) => acc + current.value, 0);
  const accumulated = Math.PI * ((size * 0.9 - thickness * 2) / 2) * 2;
  let offset = accumulated;
  const curves = [];
  const curvesInOrder = [];
  for (let i = 0; i < sections.length; i += 1) {
    curves.push({ sum, offset, data: sections[i], root: false });
    offset -= sections[i].value / 100 * accumulated;
  }
  curves.push({ sum, offset, data: { color: rootColor }, root: true });
  curvesInOrder.push(__spreadProps(__spreadValues({}, curves[curves.length - 1]), { lineRoundCaps: false }));
  if (curves.length > 2) {
    curvesInOrder.push(__spreadProps(__spreadValues({}, curves[0]), { lineRoundCaps: renderRoundedLineCaps }));
    curvesInOrder.push(__spreadProps(__spreadValues({}, curves[curves.length - 2]), { lineRoundCaps: renderRoundedLineCaps }));
    for (let i = 1; i <= curves.length - 3; i += 1) {
      curvesInOrder.push(__spreadProps(__spreadValues({}, curves[i]), { lineRoundCaps: false }));
    }
  } else {
    curvesInOrder.push(__spreadProps(__spreadValues({}, curves[0]), { lineRoundCaps: renderRoundedLineCaps }));
  }
  return curvesInOrder;
}

export { getCurves };
//# sourceMappingURL=get-curves.js.map
