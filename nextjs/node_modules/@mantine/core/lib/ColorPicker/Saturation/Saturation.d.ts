/// <reference types="react" />
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import { HsvaColor } from '../types';
import { ThumbStylesNames } from '../Thumb/Thumb';
import useStyles from './Saturation.styles';
export type SaturationStylesNames = Exclude<Selectors<typeof useStyles>, 'saturationOverlay' | 'saturationThumb'> | ThumbStylesNames;
interface SaturationProps extends DefaultProps<SaturationStylesNames> {
    variant?: string;
    value: HsvaColor;
    onChange(color: Partial<HsvaColor>): void;
    onChangeEnd(color: Partial<HsvaColor>): void;
    saturationLabel?: string;
    size: MantineSize;
    color: string;
    focusable?: boolean;
    __staticSelector?: string;
}
export declare function Saturation({ value, onChange, onChangeEnd, focusable, __staticSelector, size, color, saturationLabel, classNames, styles, unstyled, variant, }: SaturationProps): JSX.Element;
export declare namespace Saturation {
    var displayName: string;
}
export {};
//# sourceMappingURL=Saturation.d.ts.map