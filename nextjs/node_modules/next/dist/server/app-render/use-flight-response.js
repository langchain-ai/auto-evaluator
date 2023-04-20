"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useFlightResponse = useFlightResponse;
var _nodeWebStreamsHelper = require("../node-web-streams-helper");
var _htmlescape = require("../htmlescape");
var _appRender = require("./app-render");
function useFlightResponse(writable, req, clientReferenceManifest, rscChunks, flightResponseRef, nonce) {
    if (flightResponseRef.current !== null) {
        return flightResponseRef.current;
    }
    const { createFromReadableStream ,  } = require("next/dist/compiled/react-server-dom-webpack/client.edge");
    const [renderStream, forwardStream] = (0, _nodeWebStreamsHelper).readableStreamTee(req);
    const res = createFromReadableStream(renderStream, {
        moduleMap: _appRender.isEdgeRuntime ? clientReferenceManifest.edgeSSRModuleMapping : clientReferenceManifest.ssrModuleMapping
    });
    flightResponseRef.current = res;
    let bootstrapped = false;
    // We only attach CSS chunks to the inlined data.
    const forwardReader = forwardStream.getReader();
    const writer = writable.getWriter();
    const startScriptTag = nonce ? `<script nonce=${JSON.stringify(nonce)}>` : "<script>";
    const textDecoder = new TextDecoder();
    function read() {
        forwardReader.read().then(({ done , value  })=>{
            if (value) {
                rscChunks.push(value);
            }
            if (!bootstrapped) {
                bootstrapped = true;
                writer.write((0, _nodeWebStreamsHelper).encodeText(`${startScriptTag}(self.__next_f=self.__next_f||[]).push(${(0, _htmlescape).htmlEscapeJsonString(JSON.stringify([
                    0
                ]))})</script>`));
            }
            if (done) {
                flightResponseRef.current = null;
                writer.close();
            } else {
                const responsePartial = (0, _nodeWebStreamsHelper).decodeText(value, textDecoder);
                const scripts = `${startScriptTag}self.__next_f.push(${(0, _htmlescape).htmlEscapeJsonString(JSON.stringify([
                    1,
                    responsePartial
                ]))})</script>`;
                writer.write((0, _nodeWebStreamsHelper).encodeText(scripts));
                read();
            }
        });
    }
    read();
    return res;
}

//# sourceMappingURL=use-flight-response.js.map