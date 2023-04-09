/// <reference types="react" />
import { MantineColor, MantineNumberSize } from '@mantine/styles';
import { IndicatorPosition } from './Indicator.types';
export interface IndicatorStylesParams {
    radius: MantineNumberSize;
    color: MantineColor;
    position: IndicatorPosition;
    offset: number;
    inline: boolean;
    withBorder: boolean;
    withLabel: boolean;
    zIndex: React.CSSProperties['zIndex'];
}
declare const _default: (params: IndicatorStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        indicator: string;
        processing: string;
        common: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Indicator.styles.d.ts.map