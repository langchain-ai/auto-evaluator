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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mantine/core */ \"@mantine/core\");\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mantine_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/variables */ \"./utils/variables.ts\");\n/* harmony import */ var _segment_snippet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @segment/snippet */ \"@segment/snippet\");\n/* harmony import */ var _segment_snippet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_segment_snippet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mantine/notifications */ \"@mantine/notifications\");\n/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mantine_notifications__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nconst renderSegmentSnippet = ()=>{\n    const opts = {\n        apiKey: process.env.NEXT_PUBLIC_SEGMENT_KEY,\n        page: true\n    };\n    return _segment_snippet__WEBPACK_IMPORTED_MODULE_5__.min(opts);\n};\nfunction App(props) {\n    const { Component , pageProps  } = props;\n    const theme = {\n        primaryColor: \"dark\",\n        fontFamily: \"Greycliff CF, Inter,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue,Arial, Noto Sans\"\n    };\n    const pageName = \"Evaluator AI\";\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        if (!_utils_variables__WEBPACK_IMPORTED_MODULE_4__.IS_DEV) {\n            // @ts-expect-error\n            global.window.analytics.page();\n        }\n    }, [\n        props\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"favicon/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        sizes: \"32x32\",\n                        href: \"favicon/favicon-32x32.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 37,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        sizes: \"16x16\",\n                        href: \"favicon/favicon-16x16.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"apple-touch-icon\",\n                        sizes: \"180x180\",\n                        href: \"/apple-touch-icon.png\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"favicon/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 45,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"favicon/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 46,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Evaluator AI is an app that helps you evaluate your LLM powered apps.\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"og:title\",\n                        content: pageName\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"twitter:card\",\n                        content: \"summary_large_image\"\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: pageName\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, this),\n                    !_utils_variables__WEBPACK_IMPORTED_MODULE_4__.IS_DEV && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                            // eslint-disable-next-line react/no-danger\n                            dangerouslySetInnerHTML: {\n                                __html: renderSegmentSnippet()\n                            }\n                        }, void 0, false, {\n                            fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                            lineNumber: 56,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.MantineProvider, {\n                withGlobalStyles: true,\n                withNormalizeCSS: true,\n                theme: {\n                    /** Put your mantine theme override here */ colorScheme: \"light\",\n                    ...theme\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_notifications__WEBPACK_IMPORTED_MODULE_6__.Notifications, {}, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 72,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/danil/Coding/evaluator/evaluator-ui/pages/_app.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDNkI7QUFDeUM7QUFDNUM7QUFDa0I7QUFDQTtBQUNWO0FBQ3FCO0FBRXZELE1BQU1PLHVCQUF1QixJQUFNO0lBQ2pDLE1BQU1DLE9BQU87UUFDWEMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyx1QkFBdUI7UUFDM0NDLE1BQU0sSUFBSTtJQUNaO0lBRUEsT0FBT1QsaURBQVcsQ0FBQ0k7QUFDckI7QUFFZSxTQUFTTyxJQUFJQyxLQUFlLEVBQUU7SUFDM0MsTUFBTSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxHQUFHRjtJQUNqQyxNQUFNRyxRQUE4QjtRQUNsQ0MsY0FBYztRQUNkQyxZQUNFO0lBQ0o7SUFDQSxNQUFNQyxXQUFXO0lBQ2pCakIsZ0RBQVNBLENBQUMsSUFBTTtRQUNkLElBQUksQ0FBQ0Ysb0RBQU1BLEVBQUU7WUFDWCxtQkFBbUI7WUFDbkJvQixPQUFPQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ1osSUFBSTtRQUM5QixDQUFDO0lBQ0gsR0FBRztRQUFDRztLQUFNO0lBQ1YscUJBQ0U7OzBCQUNFLDhEQUFDaEIsa0RBQUlBOztrQ0FDSCw4REFBQzBCO3dCQUFLQyxLQUFJO3dCQUFPQyxNQUFLOzs7Ozs7a0NBQ3RCLDhEQUFDRjt3QkFBS0MsS0FBSTt3QkFBT0UsT0FBTTt3QkFBUUQsTUFBSzs7Ozs7O2tDQUNwQyw4REFBQ0Y7d0JBQUtDLEtBQUk7d0JBQU9FLE9BQU07d0JBQVFELE1BQUs7Ozs7OztrQ0FDcEMsOERBQUNGO3dCQUNDQyxLQUFJO3dCQUNKRSxPQUFNO3dCQUNORCxNQUFLOzs7Ozs7a0NBR1AsOERBQUNGO3dCQUFLQyxLQUFJO3dCQUFPQyxNQUFLOzs7Ozs7a0NBQ3RCLDhEQUFDRjt3QkFBS0MsS0FBSTt3QkFBT0MsTUFBSzs7Ozs7O2tDQUN0Qiw4REFBQ0U7d0JBQ0NDLE1BQUs7d0JBQ0xDLFNBQVE7Ozs7OztrQ0FFViw4REFBQ0Y7d0JBQUtDLE1BQUs7d0JBQVdDLFNBQVNWOzs7Ozs7a0NBQy9CLDhEQUFDUTt3QkFBS0MsTUFBSzt3QkFBZUMsU0FBUTs7Ozs7O2tDQUNsQyw4REFBQ0M7a0NBQU9YOzs7Ozs7b0JBQ1AsQ0FBQ25CLG9EQUFNQSxrQkFDTjtrQ0FDRSw0RUFBQytCOzRCQUNDLDJDQUEyQzs0QkFDM0NDLHlCQUF5QjtnQ0FBRUMsUUFBUTdCOzRCQUF1Qjs7Ozs7Ozs7Ozs7OzswQkFLbEUsOERBQUNOLDBEQUFlQTtnQkFDZG9DLGdCQUFnQjtnQkFDaEJDLGdCQUFnQjtnQkFDaEJuQixPQUFPO29CQUNMLHlDQUF5QyxHQUN6Q29CLGFBQWE7b0JBQ2IsR0FBR3BCLEtBQUs7Z0JBQ1Y7O2tDQUVBLDhEQUFDYixpRUFBYUE7Ozs7O2tDQUNkLDhEQUFDVzt3QkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7OztBQUloQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IHsgTWFudGluZVByb3ZpZGVyLCBNYW50aW5lVGhlbWVPdmVycmlkZSB9IGZyb20gXCJAbWFudGluZS9jb3JlXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJU19ERVYgfSBmcm9tIFwiLi4vdXRpbHMvdmFyaWFibGVzXCI7XG5pbXBvcnQgKiBhcyBzbmlwcGV0IGZyb20gXCJAc2VnbWVudC9zbmlwcGV0XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwiQG1hbnRpbmUvbm90aWZpY2F0aW9uc1wiO1xuXG5jb25zdCByZW5kZXJTZWdtZW50U25pcHBldCA9ICgpID0+IHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFR01FTlRfS0VZLFxuICAgIHBhZ2U6IHRydWUsXG4gIH07XG5cbiAgcmV0dXJuIHNuaXBwZXQubWluKG9wdHMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHByb3BzOiBBcHBQcm9wcykge1xuICBjb25zdCB7IENvbXBvbmVudCwgcGFnZVByb3BzIH0gPSBwcm9wcztcbiAgY29uc3QgdGhlbWU6IE1hbnRpbmVUaGVtZU92ZXJyaWRlID0ge1xuICAgIHByaW1hcnlDb2xvcjogXCJkYXJrXCIsXG4gICAgZm9udEZhbWlseTpcbiAgICAgIFwiR3JleWNsaWZmIENGLCBJbnRlciwtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFNlZ29lIFVJLCBSb2JvdG8sIEhlbHZldGljYSBOZXVlLEFyaWFsLCBOb3RvIFNhbnNcIixcbiAgfTtcbiAgY29uc3QgcGFnZU5hbWUgPSBcIkV2YWx1YXRvciBBSVwiO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghSVNfREVWKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICBnbG9iYWwud2luZG93LmFuYWx5dGljcy5wYWdlKCk7XG4gICAgfVxuICB9LCBbcHJvcHNdKTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiZmF2aWNvbi9mYXZpY29uLmljb1wiIC8+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBzaXplcz1cIjMyeDMyXCIgaHJlZj1cImZhdmljb24vZmF2aWNvbi0zMngzMi5wbmdcIiAvPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgc2l6ZXM9XCIxNngxNlwiIGhyZWY9XCJmYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nXCIgLz5cbiAgICAgICAgPGxpbmtcbiAgICAgICAgICByZWw9XCJhcHBsZS10b3VjaC1pY29uXCJcbiAgICAgICAgICBzaXplcz1cIjE4MHgxODBcIlxuICAgICAgICAgIGhyZWY9XCIvYXBwbGUtdG91Y2gtaWNvbi5wbmdcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiZmF2aWNvbi9mYXZpY29uLmljb1wiIC8+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiZmF2aWNvbi9mYXZpY29uLmljb1wiIC8+XG4gICAgICAgIDxtZXRhXG4gICAgICAgICAgbmFtZT1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICBjb250ZW50PVwiRXZhbHVhdG9yIEFJIGlzIGFuIGFwcCB0aGF0IGhlbHBzIHlvdSBldmFsdWF0ZSB5b3VyIExMTSBwb3dlcmVkIGFwcHMuXCJcbiAgICAgICAgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cIm9nOnRpdGxlXCIgY29udGVudD17cGFnZU5hbWV9IC8+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIC8+XG4gICAgICAgIDx0aXRsZT57cGFnZU5hbWV9PC90aXRsZT5cbiAgICAgICAgeyFJU19ERVYgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1kYW5nZXJcbiAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiByZW5kZXJTZWdtZW50U25pcHBldCgpIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9IZWFkPlxuICAgICAgPE1hbnRpbmVQcm92aWRlclxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgdGhlbWU9e3tcbiAgICAgICAgICAvKiogUHV0IHlvdXIgbWFudGluZSB0aGVtZSBvdmVycmlkZSBoZXJlICovXG4gICAgICAgICAgY29sb3JTY2hlbWU6IFwibGlnaHRcIixcbiAgICAgICAgICAuLi50aGVtZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPE5vdGlmaWNhdGlvbnMgLz5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9NYW50aW5lUHJvdmlkZXI+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiSGVhZCIsIk1hbnRpbmVQcm92aWRlciIsIlJlYWN0IiwiSVNfREVWIiwic25pcHBldCIsInVzZUVmZmVjdCIsIk5vdGlmaWNhdGlvbnMiLCJyZW5kZXJTZWdtZW50U25pcHBldCIsIm9wdHMiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU0VHTUVOVF9LRVkiLCJwYWdlIiwibWluIiwiQXBwIiwicHJvcHMiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJ0aGVtZSIsInByaW1hcnlDb2xvciIsImZvbnRGYW1pbHkiLCJwYWdlTmFtZSIsImdsb2JhbCIsIndpbmRvdyIsImFuYWx5dGljcyIsImxpbmsiLCJyZWwiLCJocmVmIiwic2l6ZXMiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJ0aXRsZSIsInNjcmlwdCIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwid2l0aEdsb2JhbFN0eWxlcyIsIndpdGhOb3JtYWxpemVDU1MiLCJjb2xvclNjaGVtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./utils/variables.ts":
/*!****************************!*\
  !*** ./utils/variables.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_URL\": () => (/* binding */ API_URL),\n/* harmony export */   \"IS_DEV\": () => (/* binding */ IS_DEV),\n/* harmony export */   \"TEXT_PLAIN\": () => (/* binding */ TEXT_PLAIN)\n/* harmony export */ });\nconst IS_DEV = process.env.NEXT_PUBLIC_ENV === \"dev\";\nconst API_URL = \"http://127.0.0.1:8000\";\nlet TEXT_PLAIN;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy92YXJpYWJsZXMudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sTUFBTUEsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxlQUFlLEtBQUssTUFBTTtBQUNyRCxNQUFNQyxVQUFVSCx1QkFBK0IsQ0FBQztBQUNoRCxJQUFJSyxXQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3V0aWxzL3ZhcmlhYmxlcy50cz8wOTg5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBJU19ERVYgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19FTlYgPT09IFwiZGV2XCI7XG5leHBvcnQgY29uc3QgQVBJX1VSTCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkw7XG5leHBvcnQgbGV0IFRFWFRfUExBSU46IFwidGV4dC9wbGFpblwiW107XG4iXSwibmFtZXMiOlsiSVNfREVWIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0VOViIsIkFQSV9VUkwiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiVEVYVF9QTEFJTiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/variables.ts\n");

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