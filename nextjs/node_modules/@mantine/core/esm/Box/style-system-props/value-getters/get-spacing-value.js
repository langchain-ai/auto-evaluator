import { getSize } from '@mantine/styles';

const NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
function getSpacingValue(size, theme) {
  if (NEGATIVE_VALUES.includes(size)) {
    return `calc(${getSize({
      size: size.replace("-", ""),
      sizes: theme.spacing
    })} * -1)`;
  }
  return getSize({ size, sizes: theme.spacing });
}

export { getSpacingValue };
//# sourceMappingURL=get-spacing-value.js.map
