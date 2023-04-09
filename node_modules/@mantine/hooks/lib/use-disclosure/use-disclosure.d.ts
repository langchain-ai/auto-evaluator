export declare function useDisclosure(initialState?: boolean, callbacks?: {
    onOpen?(): void;
    onClose?(): void;
}): readonly [boolean, {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
}];
//# sourceMappingURL=use-disclosure.d.ts.map