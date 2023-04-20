'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@mantine/utils');
var Popover_errors = require('./Popover.errors.js');

const [PopoverContextProvider, usePopoverContext] = utils.createSafeContext(Popover_errors.POPOVER_ERRORS.context);

exports.PopoverContextProvider = PopoverContextProvider;
exports.usePopoverContext = usePopoverContext;
//# sourceMappingURL=Popover.context.js.map
