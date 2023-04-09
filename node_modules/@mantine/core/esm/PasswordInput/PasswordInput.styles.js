import { createStyles, rem, getSize } from '@mantine/styles';
import { sizes } from '../Input/Input.styles.js';

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
var useStyles = createStyles((theme, { rightSectionWidth }, { size }) => ({
  visibilityToggle: {},
  input: {
    position: "relative",
    overflow: "hidden"
  },
  innerInput: __spreadProps(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), theme.fn.cover(0)), {
    backgroundColor: "transparent",
    border: `${rem(1)} solid transparent`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    boxSizing: "border-box",
    display: "block",
    width: `calc(100% - ${rem(rightSectionWidth)})`,
    paddingLeft: `calc(${getSize({ size, sizes: sizes })}  / 3)`,
    fontSize: getSize({ size, sizes: theme.fontSizes }),
    height: `calc(${getSize({ size, sizes: sizes })} - ${rem(2)})`,
    lineHeight: `calc(${getSize({ size, sizes: sizes })} - ${rem(4)})`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&::-ms-reveal, &::-ms-clear": {
      display: "none"
    },
    "&:focus": {
      outline: 0
    },
    "&:disabled": {
      cursor: "not-allowed"
    },
    "&::placeholder": __spreadProps(__spreadValues({}, theme.fn.placeholderStyles()), {
      opacity: 1
    }),
    "&[data-invalid]": {
      color: theme.fn.variant({ variant: "filled", color: "red" }).background,
      "&::placeholder": {
        opacity: 1,
        color: theme.fn.variant({ variant: "filled", color: "red" }).background
      }
    },
    "&[data-with-icon]": {
      paddingLeft: getSize({ size, sizes: sizes })
    }
  })
}));

export default useStyles;
//# sourceMappingURL=PasswordInput.styles.js.map
