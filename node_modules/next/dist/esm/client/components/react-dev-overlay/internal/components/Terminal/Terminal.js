import _extends from "@swc/helpers/src/_extends.mjs";
import Anser from 'next/dist/compiled/anser';
import * as React from 'react';
import { HotlinkedText } from '../hot-linked-text';
import { EditorLink } from './EditorLink';
function getImportTraceFiles(content) {
    if (/ReactServerComponentsError:/.test(content) || /Import trace for requested module:/.test(content)) {
        // It's an RSC Build Error
        const lines = content.split('\n');
        // Grab the lines at the end containing the files
        const files = [];
        while(/.+\..+/.test(lines[lines.length - 1]) && !lines[lines.length - 1].includes(':')){
            const file = lines.pop().trim();
            files.unshift(file);
        }
        return [
            lines.join('\n'),
            files
        ];
    }
    return [
        content,
        []
    ];
}
export const Terminal = function Terminal({ content ,  }) {
    const [source, editorLinks] = React.useMemo(()=>getImportTraceFiles(content), [
        content
    ]);
    const decoded = React.useMemo(()=>{
        return Anser.ansiToJson(source, {
            json: true,
            use_classes: true,
            remove_empty: true
        });
    }, [
        source
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        "data-nextjs-terminal": true
    }, /*#__PURE__*/ React.createElement("pre", null, decoded.map((entry, index)=>/*#__PURE__*/ React.createElement("span", {
            key: `terminal-entry-${index}`,
            style: _extends({
                color: entry.fg ? `var(--color-${entry.fg})` : undefined
            }, entry.decoration === 'bold' ? {
                fontWeight: 800
            } : entry.decoration === 'italic' ? {
                fontStyle: 'italic'
            } : undefined)
        }, /*#__PURE__*/ React.createElement(HotlinkedText, {
            text: entry.content
        }))), editorLinks.map((file)=>/*#__PURE__*/ React.createElement(EditorLink, {
            key: file,
            file: file
        }))));
};

//# sourceMappingURL=Terminal.js.map