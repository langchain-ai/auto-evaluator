import React from 'react';
import { DefaultProps, MantineSize, MantineNumberSize, Selectors } from '@mantine/styles';
import useStyles from './DefaultValue.styles';
export type DefaultValueStylesNames = Selectors<typeof useStyles>;
export interface MultiSelectValueProps extends DefaultProps<DefaultValueStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    label: string;
    onRemove(): void;
    disabled: boolean;
    readOnly: boolean;
    size: MantineSize;
    radius: MantineNumberSize;
    variant: string;
}
export declare function DefaultValue({ label, classNames, styles, className, onRemove, disabled, readOnly, size, radius, variant, unstyled, ...others }: MultiSelectValueProps): JSX.Element;
export declare namespace DefaultValue {
    var displayName: string;
}
//# sourceMappingURL=DefaultValue.d.ts.map