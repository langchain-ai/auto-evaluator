/// <reference types="react" />
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import useStyles from './Thumb.styles';
export type ThumbStylesNames = Selectors<typeof useStyles>;
interface Position {
    x: number;
    y: number;
}
export interface ThumbProps extends DefaultProps<ThumbStylesNames> {
    variant?: string;
    position: Position;
    size: MantineSize;
    __staticSelector: string;
}
export declare function Thumb({ position, className, styles, classNames, style, size, __staticSelector, unstyled, variant, }: ThumbProps): JSX.Element;
export declare namespace Thumb {
    var displayName: string;
}
export {};
//# sourceMappingURL=Thumb.d.ts.map