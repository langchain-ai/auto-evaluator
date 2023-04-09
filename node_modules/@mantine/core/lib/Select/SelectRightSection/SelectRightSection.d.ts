import React from 'react';
import { MantineSize } from '@mantine/styles';
export interface SelectRightSectionProps {
    shouldClear: boolean;
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>;
    onClear?: () => void;
    size: MantineSize;
    error?: any;
    disabled?: boolean;
}
export declare function SelectRightSection({ shouldClear, clearButtonProps, onClear, size, error, }: SelectRightSectionProps): JSX.Element;
export declare namespace SelectRightSection {
    var displayName: string;
}
//# sourceMappingURL=SelectRightSection.d.ts.map