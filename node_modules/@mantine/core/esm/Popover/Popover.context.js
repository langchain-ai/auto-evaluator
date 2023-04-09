import { createSafeContext } from '@mantine/utils';
import { POPOVER_ERRORS } from './Popover.errors.js';

const [PopoverContextProvider, usePopoverContext] = createSafeContext(POPOVER_ERRORS.context);

export { PopoverContextProvider, usePopoverContext };
//# sourceMappingURL=Popover.context.js.map
