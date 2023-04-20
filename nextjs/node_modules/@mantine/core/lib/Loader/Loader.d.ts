import React from 'react';
import { DefaultProps, MantineNumberSize, MantineColor, MantineTheme } from '@mantine/styles';
export interface LoaderProps extends DefaultProps, Omit<React.ComponentPropsWithoutRef<'svg'>, 'display' | 'opacity'> {
    /** Defines width of loader */
    size?: MantineNumberSize;
    /** Loader color from theme */
    color?: MantineColor;
    /** Loader appearance */
    variant?: MantineTheme['loader'];
}
export declare function Loader(props: LoaderProps): JSX.Element;
export declare namespace Loader {
    var displayName: string;
}
//# sourceMappingURL=Loader.d.ts.map