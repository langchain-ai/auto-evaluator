import _async_to_generator from "@swc/helpers/src/_async_to_generator.mjs";
import { encodeReply } from 'next/dist/compiled/react-server-dom-webpack/client';
export function callServer(id, args) {
    return _callServer.apply(this, arguments);
}
function _callServer() {
    _callServer = _async_to_generator(function*(id, args) {
        const actionId = id;
        // Fetching the current url with the action header.
        // TODO: Refactor this to look up from a manifest.
        const res = yield fetch('', {
            method: 'POST',
            headers: {
                Accept: 'text/x-component',
                'Next-Action': actionId
            },
            body: yield encodeReply(args)
        });
        if (!res.ok) {
            throw new Error((yield res.text()));
        }
        return (yield res.json())[0];
    });
    return _callServer.apply(this, arguments);
}

//# sourceMappingURL=app-call-server.js.map