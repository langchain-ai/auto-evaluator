/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import RenderResult from '../render-result';
export declare function handleAction({ req, res, ComponentMod, pathname, serverActionsManifest, }: {
    req: IncomingMessage;
    res: ServerResponse;
    ComponentMod: any;
    pathname: string;
    serverActionsManifest: any;
}): Promise<undefined | RenderResult | 'not-found'>;
