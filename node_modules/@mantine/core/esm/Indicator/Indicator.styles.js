import { createStyles, rem, keyframes } from '@mantine/styles';

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
const processingAnimation = (color) => keyframes({
  from: {
    boxShadow: `0 0 ${rem(0.5)} 0 ${color}`,
    opacity: 0.6
  },
  to: {
    boxShadow: `0 0 ${rem(0.5)} ${rem(4.4)} ${color}`,
    opacity: 0
  }
});
function getPositionStyles(_position, offset = 0) {
  const styles = {};
  const [position, placement] = _position.split("-");
  let translateX = "";
  let translateY = "";
  if (position === "top") {
    styles.top = offset;
    translateY = "-50%";
  }
  if (position === "middle") {
    styles.top = "50%";
    translateY = "-50%";
  }
  if (position === "bottom") {
    styles.bottom = offset;
    translateY = "50%";
  }
  if (placement === "start") {
    styles.left = offset;
    translateX = "-50%";
  }
  if (placement === "center") {
    styles.left = "50%";
    translateX = "-50%";
  }
  if (placement === "end") {
    styles.right = offset;
    translateX = "50%";
  }
  styles.transform = `translate(${translateX}, ${translateY})`;
  return styles;
}
var useStyles = createStyles((theme, {
  radius,
  color,
  position,
  offset,
  inline,
  withBorder,
  withLabel,
  zIndex
}, { size }) => {
  const { background } = theme.fn.variant({
    variant: "filled",
    primaryFallback: false,
    color: color || theme.primaryColor
  });
  const _size = rem(size);
  return {
    root: {
      position: "relative",
      display: inline ? "inline-block" : "block"
    },
    indicator: __spreadProps(__spreadValues({}, getPositionStyles(position, offset)), {
      zIndex,
      position: "absolute",
      [withLabel ? "minWidth" : "width"]: _size,
      height: _size,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: theme.fontSizes.xs,
      paddingLeft: withLabel ? `calc(${theme.spacing.xs} / 2)` : 0,
      paddingRight: withLabel ? `calc(${theme.spacing.xs} / 2)` : 0,
      borderRadius: theme.fn.radius(radius),
      backgroundColor: theme.fn.variant({
        variant: "filled",
        primaryFallback: false,
        color: color || theme.primaryColor
      }).background,
      border: withBorder ? `${rem(2)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}` : void 0,
      color: theme.white,
      whiteSpace: "nowrap"
    }),
    processing: {
      animation: `${processingAnimation(background)} 1000ms linear infinite`
    },
    common: __spreadProps(__spreadValues({}, getPositionStyles(position, offset)), {
      position: "absolute",
      [withLabel ? "minWidth" : "width"]: _size,
      height: _size,
      borderRadius: theme.fn.radius(radius)
    })
  };
});

export default useStyles;
//# sourceMappingURL=Indicator.styles.js.map
