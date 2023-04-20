/// <reference types="react" />
export type KeyboardModifiers = {
    alt: boolean;
    ctrl: boolean;
    meta: boolean;
    mod: boolean;
    shift: boolean;
};
export type Hotkey = KeyboardModifiers & {
    key?: string;
};
type CheckHotkeyMatch = (event: KeyboardEvent) => boolean;
export declare function parseHotkey(hotkey: string): Hotkey;
export declare function getHotkeyMatcher(hotkey: string): CheckHotkeyMatch;
export interface HotkeyItemOptions {
    preventDefault?: boolean;
}
type HotkeyItem = [
    string,
    (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => void,
    HotkeyItemOptions?
];
export declare function getHotkeyHandler(hotkeys: HotkeyItem[]): (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => void;
export {};
//# sourceMappingURL=parse-hotkey.d.ts.map