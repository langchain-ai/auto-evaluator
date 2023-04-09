"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mantine/core */ \"@mantine/core\");\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/variables */ \"./utils/variables.ts\");\n/* harmony import */ var _segment_snippet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @segment/snippet */ \"@segment/snippet\");\n/* harmony import */ var _segment_snippet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_segment_snippet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mantine/notifications */ \"@mantine/notifications\");\n/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mantine_notifications__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nconst renderSegmentSnippet = ()=>{\n    const opts = {\n        apiKey: process.env.NEXT_PUBLIC_SEGMENT_KEY,\n        page: true\n    };\n    return _segment_snippet__WEBPACK_IMPORTED_MODULE_5__.min(opts);\n};\nfunction App(props) {\n    const { Component , pageProps  } = props;\n    const theme = {\n        primaryColor: \"dark\",\n        fontFamily: \"Inter,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue,Arial, Noto Sans\"\n    };\n    const pageName = \"Evaluator AI\";\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        if (!_utils_variables__WEBPACK_IMPORTED_MODULE_4__.IS_DEV) {\n            // @ts-expect-error\n            global.window.analytics.page();\n        }\n    }, [\n        props\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"favicon/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        sizes: \"32x32\",\n                        href: \"favicon/favicon-32x32.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 37,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        sizes: \"16x16\",\n                        href: \"favicon/favicon-16x16.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"apple-touch-icon\",\n                        sizes: \"180x180\",\n                        href: \"/apple-touch-icon.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"favicon/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 45,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"favicon/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 46,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Evaluator AI is an app that helps you evaluate your LLM powered apps.\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"og:title\",\n                        content: pageName\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"twitter:card\",\n                        content: \"summary_large_image\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: pageName\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, this),\n                    !_utils_variables__WEBPACK_IMPORTED_MODULE_4__.IS_DEV && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                            // eslint-disable-next-line react/no-danger\n                            dangerouslySetInnerHTML: {\n                                __html: renderSegmentSnippet()\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                            lineNumber: 56,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.MantineProvider, {\n                withGlobalStyles: true,\n                withNormalizeCSS: true,\n                theme: {\n                    /** Put your mantine theme override here */ colorScheme: \"light\",\n                    ...theme\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_notifications__WEBPACK_IMPORTED_MODULE_6__.Notifications, {}, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 72,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDNkI7QUFDeUM7QUFDNUM7QUFDa0I7QUFDQTtBQUNWO0FBQ3FCO0FBRXZELE1BQU1PLHVCQUF1QixJQUFNO0lBQ2pDLE1BQU1DLE9BQU87UUFDWEMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyx1QkFBdUI7UUFDM0NDLE1BQU0sSUFBSTtJQUNaO0lBRUEsT0FBT1QsaURBQVcsQ0FBQ0k7QUFDckI7QUFFZSxTQUFTTyxJQUFJQyxLQUFlLEVBQUU7SUFDM0MsTUFBTSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxHQUFHRjtJQUNqQyxNQUFNRyxRQUE4QjtRQUNsQ0MsY0FBYztRQUNkQyxZQUNFO0lBQ0o7SUFDQSxNQUFNQyxXQUFXO0lBQ2pCakIsZ0RBQVNBLENBQUMsSUFBTTtRQUNkLElBQUksQ0FBQ0Ysb0RBQU1BLEVBQUU7WUFDWCxtQkFBbUI7WUFDbkJvQixPQUFPQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ1osSUFBSTtRQUM5QixDQUFDO0lBQ0gsR0FBRztRQUFDRztLQUFNO0lBQ1YscUJBQ0U7OzBCQUNFLDhEQUFDaEIsa0RBQUlBOztrQ0FDSCw4REFBQzBCO3dCQUFLQyxLQUFJO3dCQUFPQyxNQUFLOzs7Ozs7a0NBQ3RCLDhEQUFDRjt3QkFBS0MsS0FBSTt3QkFBT0UsT0FBTTt3QkFBUUQsTUFBSzs7Ozs7O2tDQUNwQyw4REFBQ0Y7d0JBQUtDLEtBQUk7d0JBQU9FLE9BQU07d0JBQVFELE1BQUs7Ozs7OztrQ0FDcEMsOERBQUNGO3dCQUNDQyxLQUFJO3dCQUNKRSxPQUFNO3dCQUNORCxNQUFLOzs7Ozs7a0NBR1AsOERBQUNGO3dCQUFLQyxLQUFJO3dCQUFPQyxNQUFLOzs7Ozs7a0NBQ3RCLDhEQUFDRjt3QkFBS0MsS0FBSTt3QkFBT0MsTUFBSzs7Ozs7O2tDQUN0Qiw4REFBQ0U7d0JBQ0NDLE1BQUs7d0JBQ0xDLFNBQVE7Ozs7OztrQ0FFViw4REFBQ0Y7d0JBQUtDLE1BQUs7d0JBQVdDLFNBQVNWOzs7Ozs7a0NBQy9CLDhEQUFDUTt3QkFBS0MsTUFBSzt3QkFBZUMsU0FBUTs7Ozs7O2tDQUNsQyw4REFBQ0M7a0NBQU9YOzs7Ozs7b0JBQ1AsQ0FBQ25CLG9EQUFNQSxrQkFDTjtrQ0FDRSw0RUFBQytCOzRCQUNDLDJDQUEyQzs0QkFDM0NDLHlCQUF5QjtnQ0FBRUMsUUFBUTdCOzRCQUF1Qjs7Ozs7Ozs7Ozs7OzswQkFLbEUsOERBQUNOLDBEQUFlQTtnQkFDZG9DLGdCQUFnQjtnQkFDaEJDLGdCQUFnQjtnQkFDaEJuQixPQUFPO29CQUNMLHlDQUF5QyxHQUN6Q29CLGFBQWE7b0JBQ2IsR0FBR3BCLEtBQUs7Z0JBQ1Y7O2tDQUVBLDhEQUFDYixpRUFBYUE7Ozs7O2tDQUNkLDhEQUFDVzt3QkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7OztBQUloQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IHsgTWFudGluZVByb3ZpZGVyLCBNYW50aW5lVGhlbWVPdmVycmlkZSB9IGZyb20gXCJAbWFudGluZS9jb3JlXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJU19ERVYgfSBmcm9tIFwiLi4vdXRpbHMvdmFyaWFibGVzXCI7XG5pbXBvcnQgKiBhcyBzbmlwcGV0IGZyb20gXCJAc2VnbWVudC9zbmlwcGV0XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiQG1hbnRpbmUvbm90aWZpY2F0aW9uc1wiO1xuXG5jb25zdCByZW5kZXJTZWdtZW50U25pcHBldCA9ICgpID0+IHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFR01FTlRfS0VZLFxuICAgIHBhZ2U6IHRydWUsXG4gIH07XG5cbiAgcmV0dXJuIHNuaXBwZXQubWluKG9wdHMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHByb3BzOiBBcHBQcm9wcykge1xuICBjb25zdCB7IENvbXBvbmVudCwgcGFnZVByb3BzIH0gPSBwcm9wcztcbiAgY29uc3QgdGhlbWU6IE1hbnRpbmVUaGVtZU92ZXJyaWRlID0ge1xuICAgIHByaW1hcnlDb2xvcjogXCJkYXJrXCIsXG4gICAgZm9udEZhbWlseTpcbiAgICAgIFwiSW50ZXIsLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLCBIZWx2ZXRpY2EgTmV1ZSxBcmlhbCwgTm90byBTYW5zXCIsXG4gIH07XG4gIGNvbnN0IHBhZ2VOYW1lID0gXCJFdmFsdWF0b3IgQUlcIjtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIUlTX0RFVikge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgZ2xvYmFsLndpbmRvdy5hbmFseXRpY3MucGFnZSgpO1xuICAgIH1cbiAgfSwgW3Byb3BzXSk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cImZhdmljb24vZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgc2l6ZXM9XCIzMngzMlwiIGhyZWY9XCJmYXZpY29uL2Zhdmljb24tMzJ4MzIucG5nXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIHNpemVzPVwiMTZ4MTZcIiBocmVmPVwiZmF2aWNvbi9mYXZpY29uLTE2eDE2LnBuZ1wiIC8+XG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiXG4gICAgICAgICAgc2l6ZXM9XCIxODB4MTgwXCJcbiAgICAgICAgICBocmVmPVwiL2FwcGxlLXRvdWNoLWljb24ucG5nXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cImZhdmljb24vZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cImZhdmljb24vZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICA8bWV0YVxuICAgICAgICAgIG5hbWU9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgY29udGVudD1cIkV2YWx1YXRvciBBSSBpcyBhbiBhcHAgdGhhdCBoZWxwcyB5b3UgZXZhbHVhdGUgeW91ciBMTE0gcG93ZXJlZCBhcHBzLlwiXG4gICAgICAgIC8+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9e3BhZ2VOYW1lfSAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjpjYXJkXCIgY29udGVudD1cInN1bW1hcnlfbGFyZ2VfaW1hZ2VcIiAvPlxuICAgICAgICA8dGl0bGU+e3BhZ2VOYW1lfTwvdGl0bGU+XG4gICAgICAgIHshSVNfREVWICYmIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tZGFuZ2VyXG4gICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogcmVuZGVyU2VnbWVudFNuaXBwZXQoKSB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgd2l0aEdsb2JhbFN0eWxlc1xuICAgICAgICB3aXRoTm9ybWFsaXplQ1NTXG4gICAgICAgIHRoZW1lPXt7XG4gICAgICAgICAgLyoqIFB1dCB5b3VyIG1hbnRpbmUgdGhlbWUgb3ZlcnJpZGUgaGVyZSAqL1xuICAgICAgICAgIGNvbG9yU2NoZW1lOiBcImxpZ2h0XCIsXG4gICAgICAgICAgLi4udGhlbWUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxOb3RpZmljYXRpb25zIC8+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkhlYWQiLCJNYW50aW5lUHJvdmlkZXIiLCJSZWFjdCIsIklTX0RFViIsInNuaXBwZXQiLCJ1c2VFZmZlY3QiLCJOb3RpZmljYXRpb25zIiwicmVuZGVyU2VnbWVudFNuaXBwZXQiLCJvcHRzIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NFR01FTlRfS0VZIiwicGFnZSIsIm1pbiIsIkFwcCIsInByb3BzIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwidGhlbWUiLCJwcmltYXJ5Q29sb3IiLCJmb250RmFtaWx5IiwicGFnZU5hbWUiLCJnbG9iYWwiLCJ3aW5kb3ciLCJhbmFseXRpY3MiLCJsaW5rIiwicmVsIiwiaHJlZiIsInNpemVzIiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwidGl0bGUiLCJzY3JpcHQiLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsIl9faHRtbCIsIndpdGhHbG9iYWxTdHlsZXMiLCJ3aXRoTm9ybWFsaXplQ1NTIiwiY29sb3JTY2hlbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./utils/variables.ts":
/*!****************************!*\
  !*** ./utils/variables.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IS_DEV\": () => (/* binding */ IS_DEV)\n/* harmony export */ });\nconst IS_DEV = process.env.NEXT_PUBLIC_ENV === \"dev\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy92YXJpYWJsZXMudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU1BLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxLQUFLLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy92YXJpYWJsZXMudHM/MDk4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgSVNfREVWID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRU5WID09PSBcImRldlwiOyJdLCJuYW1lcyI6WyJJU19ERVYiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfRU5WIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/variables.ts\n");

/***/ }),

/***/ "@mantine/core":
/*!********************************!*\
  !*** external "@mantine/core" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@mantine/core");

/***/ }),

/***/ "@mantine/notifications":
/*!*****************************************!*\
  !*** external "@mantine/notifications" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@mantine/notifications");

/***/ }),

/***/ "@segment/snippet":
/*!***********************************!*\
  !*** external "@segment/snippet" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@segment/snippet");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();