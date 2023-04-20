'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ssr = require('@mantine/ssr');
var createGetInitialProps = require('./create-get-initial-props.js');



exports.createGetInitialProps = createGetInitialProps.createGetInitialProps;
Object.keys(ssr).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = ssr[k];
});
//# sourceMappingURL=index.js.map
