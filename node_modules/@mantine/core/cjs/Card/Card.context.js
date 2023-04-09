'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const CardContext = React.createContext({ padding: 0 });
const CardProvider = CardContext.Provider;
const useCardPadding = () => React.useContext(CardContext).padding;

exports.CardProvider = CardProvider;
exports.useCardPadding = useCardPadding;
//# sourceMappingURL=Card.context.js.map
