import React from 'react';
import { ColorScheme } from './types';
interface ColorSchemeContextProps {
    colorScheme: ColorScheme;
    toggleColorScheme(colorScheme?: ColorScheme): void;
}
export declare function useMantineColorScheme(): ColorSchemeContextProps;
interface ColorSchemeProviderProps extends ColorSchemeContextProps {
    children: React.ReactNode;
}
export declare function ColorSchemeProvider({ colorScheme, toggleColorScheme, children, }: ColorSchemeProviderProps): JSX.Element;
export declare namespace ColorSchemeProvider {
    var displayName: string;
}
export {};
//# sourceMappingURL=ColorSchemeProvider.d.ts.map