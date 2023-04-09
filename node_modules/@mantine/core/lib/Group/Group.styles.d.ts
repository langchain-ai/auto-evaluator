import React from 'react';
import { MantineNumberSize } from '@mantine/styles';
export type GroupPosition = 'right' | 'center' | 'left' | 'apart';
export interface GroupStylesParams {
    position: GroupPosition;
    noWrap: boolean;
    grow: boolean;
    spacing: MantineNumberSize;
    align: React.CSSProperties['alignItems'];
    count: number;
}
export declare const GROUP_POSITIONS: {
    left: string;
    center: string;
    right: string;
    apart: string;
};
declare const _default: (params: GroupStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Group.styles.d.ts.map