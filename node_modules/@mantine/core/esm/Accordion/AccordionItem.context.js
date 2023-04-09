import { createSafeContext } from '@mantine/utils';
import { ACCORDION_ERRORS } from './Accordion.errors.js';

const [AccordionItemContextProvider, useAccordionItemContext] = createSafeContext(ACCORDION_ERRORS.itemContext);

export { AccordionItemContextProvider, useAccordionItemContext };
//# sourceMappingURL=AccordionItem.context.js.map
