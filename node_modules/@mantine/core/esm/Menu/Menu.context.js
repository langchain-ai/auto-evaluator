import { createSafeContext } from '@mantine/utils';
import { MENU_ERRORS } from './Menu.errors.js';

const [MenuContextProvider, useMenuContext] = createSafeContext(MENU_ERRORS.context);

export { MenuContextProvider, useMenuContext };
//# sourceMappingURL=Menu.context.js.map
