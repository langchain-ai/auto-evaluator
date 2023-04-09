import { createStyles, getSize } from '@mantine/styles';
import { sizes } from '../PaginationControl/PaginationControl.styles.js';

var useStyles = createStyles((theme, _params, { size }) => ({
  dots: {
    height: getSize({ size, sizes }),
    minWidth: getSize({ size, sizes }),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none"
  }
}));

export default useStyles;
//# sourceMappingURL=PaginationDots.styles.js.map
