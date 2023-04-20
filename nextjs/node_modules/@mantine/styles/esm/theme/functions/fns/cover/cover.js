import { rem } from '../../../utils/rem/rem.js';

function cover(offset = 0) {
  return {
    position: "absolute",
    top: rem(offset),
    right: rem(offset),
    left: rem(offset),
    bottom: rem(offset)
  };
}

export { cover };
//# sourceMappingURL=cover.js.map
