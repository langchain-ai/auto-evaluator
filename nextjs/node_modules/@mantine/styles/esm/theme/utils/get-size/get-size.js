import { em, rem } from '../rem/rem.js';

function getSize({
  size,
  sizes,
  units
}) {
  if (size in sizes) {
    return sizes[size];
  }
  if (typeof size === "number") {
    return units === "em" ? em(size) : rem(size);
  }
  return size || sizes.md;
}

export { getSize };
//# sourceMappingURL=get-size.js.map
