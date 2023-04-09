import { createSafeContext } from '@mantine/utils';
import { HOVER_CARD_ERRORS } from './HoverCard.errors.js';

const [HoverCardContextProvider, useHoverCardContext] = createSafeContext(HOVER_CARD_ERRORS.context);

export { HoverCardContextProvider, useHoverCardContext };
//# sourceMappingURL=HoverCard.context.js.map
