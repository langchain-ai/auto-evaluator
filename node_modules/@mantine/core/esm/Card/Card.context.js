import { useContext, createContext } from 'react';

const CardContext = createContext({ padding: 0 });
const CardProvider = CardContext.Provider;
const useCardPadding = () => useContext(CardContext).padding;

export { CardProvider, useCardPadding };
//# sourceMappingURL=Card.context.js.map
