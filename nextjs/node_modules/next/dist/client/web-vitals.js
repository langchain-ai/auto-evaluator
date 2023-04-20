"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useReportWebVitals = useReportWebVitals;
var _react = require("react");
var _webVitals = require("next/dist/compiled/web-vitals");
function useReportWebVitals(reportWebVitalsFn) {
    (0, _react).useEffect(()=>{
        (0, _webVitals).onCLS(reportWebVitalsFn);
        (0, _webVitals).onFID(reportWebVitalsFn);
        (0, _webVitals).onLCP(reportWebVitalsFn);
        (0, _webVitals).onINP(reportWebVitalsFn);
        (0, _webVitals).onFCP(reportWebVitalsFn);
        (0, _webVitals).onTTFB(reportWebVitalsFn);
    }, [
        reportWebVitalsFn
    ]);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=web-vitals.js.map