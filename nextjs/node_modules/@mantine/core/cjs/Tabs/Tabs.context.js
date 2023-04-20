'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@mantine/utils');
var Tabs_errors = require('./Tabs.errors.js');

const [TabsContextProvider, useTabsContext] = utils.createSafeContext(Tabs_errors.TABS_ERRORS.context);

exports.TabsContextProvider = TabsContextProvider;
exports.useTabsContext = useTabsContext;
//# sourceMappingURL=Tabs.context.js.map
