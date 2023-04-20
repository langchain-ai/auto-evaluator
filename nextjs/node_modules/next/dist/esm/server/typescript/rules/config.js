// This module provides intellisense for page and layout's exported configs.
import { getSource, isPositionInsideNode, getTs, removeStringQuotes } from "../utils";
import { NEXT_TS_ERRORS, ALLOWED_EXPORTS, LEGACY_CONFIG_EXPORT } from "../constant";
const API_DOCS = {
    dynamic: {
        description: "The `dynamic` option provides a few ways to opt in or out of dynamic behavior.",
        options: {
            '"auto"': "Heuristic to cache as much as possible but doesn\u2019t prevent any component to opt-in to dynamic behavior.",
            '"force-dynamic"': "This disables all caching of fetches and always revalidates. (This is equivalent to `getServerSideProps`.)",
            '"error"': "This errors if any dynamic Hooks or fetches are used. (This is equivalent to `getStaticProps`.)",
            '"force-static"': "This forces caching of all fetches and returns empty values from `cookies`, `headers` and `useSearchParams`."
        },
        link: "https://beta.nextjs.org/docs/api-reference/segment-config#dynamic"
    },
    fetchCache: {
        description: "The `fetchCache` option controls how Next.js statically caches fetches. By default it statically caches fetches reachable before any dynamic Hooks are used, and it doesn\u2019t cache fetches that are discovered after that.",
        options: {
            '"force-no-store"': "This lets you intentionally opt-out of all caching of data. This option forces all fetches to be refetched every request even if the `cache: 'force-cache'` option is passed to `fetch()`.",
            '"only-no-store"': "This lets you enforce that all data opts out of caching. This option makes `fetch()` reject with an error if `cache: 'force-cache'` is provided. It also changes the default to `no-store`.",
            '"default-no-store"': "Allows any explicit `cache` option to be passed to `fetch()` but if `'default'`, or no option, is provided then it defaults to `'no-store'`. This means that even fetches before a dynamic Hook are considered dynamic.",
            '"auto"': "This is the default option. It caches any fetches with the default `cache` option provided, that happened before a dynamic Hook is used and don\u2019t cache any such fetches if they\u2019re issued after a dynamic Hook.",
            '"default-cache"': "Allows any explicit `cache` option to be passed to `fetch()` but if `'default'`, or no option, is provided then it defaults to `'force-cache'`. This means that even fetches before a dynamic Hook are considered dynamic.",
            '"only-cache"': "This lets you enforce that all data opts into caching. This option makes `fetch()` reject with an error if `cache: 'force-cache'` is provided. It also changes the default to `force-cache`. This error can be discovered early during static builds - or dynamically during Edge rendering.",
            '"force-cache"': "This lets you intentionally opt-in to all caching of data. This option forces all fetches to be cache even if the `cache: 'no-store'` option is passed to `fetch()`."
        },
        link: "https://beta.nextjs.org/docs/api-reference/segment-config#fetchcache"
    },
    preferredRegion: {
        description: 'Specify the perferred region that this layout or page should be deployed to. If the region option is not specified, it inherits the option from the nearest parent layout. The root defaults to `"auto"`.',
        options: {
            '"auto"': 'Next.js will first deploy to the `"home"` region. Then if it doesn\u2019t detect any waterfall requests after a few requests, it can upgrade that route, to be deployed globally to `"edge"`. If it detects any waterfall requests after that, it can eventually downgrade back to `"home`".',
            '"home"': "Prefer deploying to the Home region.",
            '"edge"': "Prefer deploying to the Edge globally."
        },
        link: "https://beta.nextjs.org/docs/api-reference/segment-config#preferredregion"
    },
    revalidate: {
        description: "The `revalidate` option sets the default revalidation time for that layout or page. Note that it doesn\u2019t override the value specify by each `fetch()`.",
        type: "mixed",
        options: {
            false: "This is the default and changes the fetch cache to indefinitely cache anything that uses force-cache or is fetched before a dynamic Hook/fetch.",
            0: "Specifying `0` implies that this layout or page should never be static.",
            30: "Set the revalidation time to `30` seconds. The value can be `0` or any positive number."
        },
        link: "https://beta.nextjs.org/docs/api-reference/segment-config#revalidate",
        isValid: (value)=>{
            return value === "false" || Number(value) >= 0;
        },
        getHint: (value)=>{
            return `Set the default revalidation time to \`${value}\` seconds.`;
        }
    },
    dynamicParams: {
        description: "`dynamicParams` replaces the `fallback` option of `getStaticPaths`. It controls whether we allow `dynamicParams` beyond the generated static params from `generateStaticParams`.",
        options: {
            true: "Allow rendering dynamic params that are not generated by `generateStaticParams`.",
            false: "Disallow rendering dynamic params that are not generated by `generateStaticParams`."
        },
        link: "https://beta.nextjs.org/docs/api-reference/segment-config#dynamicparams"
    },
    runtime: {
        description: "The `runtime` option controls the preferred runtime to render this route.",
        options: {
            '"nodejs"': "Prefer the Node.js runtime.",
            '"edge"': "Prefer the Edge runtime.",
            '"experimental-edge"': "Prefer the experimental Edge runtime."
        },
        link: "https://beta.nextjs.org/docs/api-reference/segment-config#runtime"
    },
    metadata: {
        description: "Next.js Metadata configurations",
        link: "https://beta.nextjs.org/docs/api-reference/metadata"
    }
};
function visitEntryConfig(fileName, position, callback) {
    const source = getSource(fileName);
    if (source) {
        const ts = getTs();
        ts.forEachChild(source, function visit(node) {
            // Covered by this node
            if (isPositionInsideNode(position, node)) {
                var ref;
                // Export variable
                if (ts.isVariableStatement(node) && ((ref = node.modifiers) == null ? void 0 : ref.some((m)=>m.kind === ts.SyntaxKind.ExportKeyword))) {
                    if (ts.isVariableDeclarationList(node.declarationList)) {
                        for (const declaration of node.declarationList.declarations){
                            if (isPositionInsideNode(position, declaration)) {
                                // `export const ... = ...`
                                const text = declaration.name.getText();
                                callback(text, declaration);
                            }
                        }
                    }
                }
            }
        });
    }
}
function createAutoCompletionOptionName(sort, name) {
    const ts = getTs();
    return {
        name,
        sortText: "!" + sort,
        kind: ts.ScriptElementKind.constElement,
        kindModifiers: ts.ScriptElementKindModifier.exportedModifier,
        labelDetails: {
            description: `Next.js ${name} option`
        },
        data: {
            exportName: name,
            moduleSpecifier: "next/typescript/entry_option_name"
        }
    };
}
function createAutoCompletionOptionValue(sort, name, apiName) {
    const ts = getTs();
    const isString = name.startsWith('"');
    return {
        name,
        insertText: removeStringQuotes(name),
        sortText: "" + sort,
        kind: isString ? ts.ScriptElementKind.string : ts.ScriptElementKind.unknown,
        kindModifiers: ts.ScriptElementKindModifier.none,
        labelDetails: {
            description: `Next.js ${apiName} option`
        },
        data: {
            exportName: apiName,
            moduleSpecifier: "next/typescript/entry_option_value"
        }
    };
}
function getAPIDescription(api) {
    return API_DOCS[api].description + "\n\n" + Object.entries(API_DOCS[api].options || {}).map(([key, value])=>`- \`${key}\`: ${value}`).join("\n");
}
const config = {
    // Auto completion for entry exported configs.
    addCompletionsAtPosition (fileName, position, prior) {
        visitEntryConfig(fileName, position, (entryConfig, declaration)=>{
            if (!API_DOCS[entryConfig]) {
                if (isPositionInsideNode(position, declaration.name)) {
                    prior.entries.push(...Object.keys(API_DOCS).map((name, index)=>{
                        return createAutoCompletionOptionName(index, name);
                    }));
                }
                return;
            }
            prior.entries.push(...Object.keys(API_DOCS[entryConfig].options || {}).map((name, index)=>{
                return createAutoCompletionOptionValue(index, name, entryConfig);
            }));
        });
    },
    // Show docs when hovering on the exported configs.
    getQuickInfoAtPosition (fileName, position) {
        const ts = getTs();
        let overriden;
        visitEntryConfig(fileName, position, (entryConfig, declaration)=>{
            if (!API_DOCS[entryConfig]) return;
            const name = declaration.name;
            const value = declaration.initializer;
            const docsLink = {
                kind: "text",
                text: `\n\nRead more about the "${entryConfig}" option: ` + API_DOCS[entryConfig].link
            };
            if (value && isPositionInsideNode(position, value)) {
                var _entryConfig, ref, ref1;
                // Hovers the value of the config
                const isString = ts.isStringLiteral(value);
                const text = removeStringQuotes(value.getText());
                const key = isString ? `"${text}"` : text;
                const isValid = API_DOCS[entryConfig].isValid ? (ref = (_entryConfig = API_DOCS[entryConfig]).isValid) == null ? void 0 : ref.call(_entryConfig, key) : !!((ref1 = API_DOCS[entryConfig].options) == null ? void 0 : ref1[key]);
                if (isValid) {
                    var ref2, _entryConfig1, ref3;
                    overriden = {
                        kind: ts.ScriptElementKind.enumElement,
                        kindModifiers: ts.ScriptElementKindModifier.none,
                        textSpan: {
                            start: value.getStart(),
                            length: value.getWidth()
                        },
                        displayParts: [],
                        documentation: [
                            {
                                kind: "text",
                                text: ((ref2 = API_DOCS[entryConfig].options) == null ? void 0 : ref2[key]) || ((ref3 = (_entryConfig1 = API_DOCS[entryConfig]).getHint) == null ? void 0 : ref3.call(_entryConfig1, key)) || ""
                            },
                            docsLink, 
                        ]
                    };
                } else {
                    // Wrong value, display the docs link
                    overriden = {
                        kind: ts.ScriptElementKind.enumElement,
                        kindModifiers: ts.ScriptElementKindModifier.none,
                        textSpan: {
                            start: value.getStart(),
                            length: value.getWidth()
                        },
                        displayParts: [],
                        documentation: [
                            docsLink
                        ]
                    };
                }
            } else {
                // Hovers the name of the config
                overriden = {
                    kind: ts.ScriptElementKind.enumElement,
                    kindModifiers: ts.ScriptElementKindModifier.none,
                    textSpan: {
                        start: name.getStart(),
                        length: name.getWidth()
                    },
                    displayParts: [],
                    documentation: [
                        {
                            kind: "text",
                            text: getAPIDescription(entryConfig)
                        },
                        docsLink, 
                    ]
                };
            }
        });
        return overriden;
    },
    // Show details on the side when auto completing.
    getCompletionEntryDetails (entryName, data) {
        const ts = getTs();
        if (data && data.moduleSpecifier && data.moduleSpecifier.startsWith("next/typescript")) {
            let content = "";
            if (data.moduleSpecifier === "next/typescript/entry_option_name") {
                content = getAPIDescription(entryName);
            } else {
                const options = API_DOCS[data.exportName].options;
                if (!options) return;
                content = options[entryName];
            }
            return {
                name: entryName,
                kind: ts.ScriptElementKind.enumElement,
                kindModifiers: ts.ScriptElementKindModifier.none,
                displayParts: [],
                documentation: [
                    {
                        kind: "text",
                        text: content
                    }, 
                ]
            };
        }
    },
    // Show errors for invalid export fields.
    getSemanticDiagnosticsForExportVariableStatement (source, node) {
        const ts = getTs();
        const diagnostics = [];
        // Check if it has correct option exports
        if (ts.isVariableDeclarationList(node.declarationList)) {
            for (const declaration of node.declarationList.declarations){
                const name = declaration.name;
                if (ts.isIdentifier(name)) {
                    if (!ALLOWED_EXPORTS.includes(name.text) && !API_DOCS[name.text]) {
                        diagnostics.push({
                            file: source,
                            category: ts.DiagnosticCategory.Error,
                            code: NEXT_TS_ERRORS.INVALID_ENTRY_EXPORT,
                            messageText: `"${name.text}" is not a valid Next.js entry export value.`,
                            start: name.getStart(),
                            length: name.getWidth()
                        });
                    } else if (API_DOCS[name.text]) {
                        // Check if the value is valid
                        const value = declaration.initializer;
                        const options = API_DOCS[name.text].options;
                        if (value && options) {
                            let displayedValue = "";
                            let errorMessage = "";
                            let isInvalid = false;
                            if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
                                const text = removeStringQuotes(value.getText());
                                const allowedValues = Object.keys(options).filter((v)=>/^['"]/.test(v)).map(removeStringQuotes);
                                if (!allowedValues.includes(text)) {
                                    isInvalid = true;
                                    displayedValue = `'${text}'`;
                                }
                            } else if (ts.isNumericLiteral(value) || ts.isPrefixUnaryExpression(value) && ts.isMinusToken(value.operator) && (ts.isNumericLiteral(value.operand.kind) || ts.isIdentifier(value.operand.kind) && value.operand.kind.getText() === "Infinity") || ts.isIdentifier(value) && value.getText() === "Infinity") {
                                var _text, ref;
                                const v = value.getText();
                                if (((ref = (_text = API_DOCS[name.text]).isValid) == null ? void 0 : ref.call(_text, v)) === false) {
                                    isInvalid = true;
                                    displayedValue = v;
                                }
                            } else if (value.kind === ts.SyntaxKind.TrueKeyword || value.kind === ts.SyntaxKind.FalseKeyword) {
                                var _text1, ref4;
                                const v = value.getText();
                                if (((ref4 = (_text1 = API_DOCS[name.text]).isValid) == null ? void 0 : ref4.call(_text1, v)) === false) {
                                    isInvalid = true;
                                    displayedValue = v;
                                }
                            } else if (// Other literals
                            ts.isBigIntLiteral(value) || ts.isArrayLiteralExpression(value) || ts.isObjectLiteralExpression(value) || ts.isRegularExpressionLiteral(value) || ts.isPrefixUnaryExpression(value)) {
                                isInvalid = true;
                                displayedValue = value.getText();
                            } else {
                                // Not a literal, error because it's not statically analyzable
                                isInvalid = true;
                                displayedValue = value.getText();
                                errorMessage = `"${displayedValue}" is not a valid value for the "${name.text}" option. The configuration must be statically analyzable.`;
                            }
                            if (isInvalid) {
                                diagnostics.push({
                                    file: source,
                                    category: ts.DiagnosticCategory.Error,
                                    code: NEXT_TS_ERRORS.INVALID_OPTION_VALUE,
                                    messageText: errorMessage || `"${displayedValue}" is not a valid value for the "${name.text}" option.`,
                                    start: value.getStart(),
                                    length: value.getWidth()
                                });
                            }
                        }
                    } else if (name.text === LEGACY_CONFIG_EXPORT) {
                        // export const config = { ... }
                        // Error if using `amp: ...`
                        const value = declaration.initializer;
                        if (value && ts.isObjectLiteralExpression(value)) {
                            for (const prop of value.properties){
                                if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === "amp") {
                                    diagnostics.push({
                                        file: source,
                                        category: ts.DiagnosticCategory.Error,
                                        code: NEXT_TS_ERRORS.INVALID_CONFIG_OPTION,
                                        messageText: `AMP is not supported in the app directory. If you need to use AMP it will continue to be supported in the pages directory.`,
                                        start: prop.getStart(),
                                        length: prop.getWidth()
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        return diagnostics;
    }
};
export default config;

//# sourceMappingURL=config.js.map