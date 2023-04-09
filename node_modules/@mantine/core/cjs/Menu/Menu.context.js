'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@mantine/utils');
var Menu_errors = require('./Menu.errors.js');

const [MenuContextProvider, useMenuContext] = utils.createSafeContext(Menu_errors.MENU_ERRORS.context);

exports.MenuContextProvider = MenuContextProvider;
exports.useMenuContext = useMenuContext;
//# sourceMappingURL=Menu.context.js.map
