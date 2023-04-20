import React from 'react';
export declare function suspense(): void;
declare type Child = React.ReactElement<any, any>;
export declare function NoSSR({ children }: {
    children: Child;
}): Child;
export {};
