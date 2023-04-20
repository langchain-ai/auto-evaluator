import React from 'react';
interface Options {
    active: boolean;
    onTrigger?(): void;
    onKeyDown?(event: React.KeyboardEvent<any>): void;
}
export declare function closeOnEscape(callback?: (event: any) => void, options?: Options): (event: React.KeyboardEvent<any>) => void;
export {};
//# sourceMappingURL=close-on-escape.d.ts.map