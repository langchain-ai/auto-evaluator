/// <reference types="react" />
interface AppShellContextValue {
    zIndex: React.CSSProperties['zIndex'];
    fixed: boolean;
    layout: 'default' | 'alt';
}
export declare const AppShellProvider: import("react").Provider<AppShellContextValue>;
export declare function useAppShellContext(): AppShellContextValue;
export {};
//# sourceMappingURL=AppShell.context.d.ts.map