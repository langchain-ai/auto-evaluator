import { createSafeContext } from '@mantine/utils';
import { ACCORDION_ERRORS } from './Accordion.errors.js';

const [AccordionContextProvider, useAccordionContext] = createSafeContext(ACCORDION_ERRORS.context);

export { AccordionContextProvider, useAccordionContext };
//# sourceMappingURL=Accordion.context.js.map
