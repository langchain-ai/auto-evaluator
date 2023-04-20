import React, { CSSProperties } from 'react';
import { DefaultProps, SystemProp, SpacingValue } from '@mantine/styles';
export interface FlexProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    /** gap CSS property */
    gap?: SystemProp<SpacingValue>;
    /** row-gap CSS property */
    rowGap?: SystemProp<SpacingValue>;
    /** column-gap CSS property */
    columnGap?: SystemProp<SpacingValue>;
    /** align-items CSS property */
    align?: SystemProp<CSSProperties['alignItems']>;
    /** justify-content CSS property */
    justify?: SystemProp<CSSProperties['justifyContent']>;
    /** flex-wrap CSS property */
    wrap?: SystemProp<CSSProperties['flexWrap']>;
    /** flex-direction CSS property */
    direction?: SystemProp<CSSProperties['flexDirection']>;
}
export declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Flex.d.ts.map