import React from 'react';
import { MantineTheme } from '@mantine/styles';
import { SelectRightSectionProps } from './SelectRightSection';
interface GetRightSectionProps extends SelectRightSectionProps {
    rightSection?: React.ReactNode;
    rightSectionWidth?: string | number;
    styles: Record<string, any>;
    theme: MantineTheme;
    readOnly: boolean;
}
export declare function getSelectRightSectionProps({ styles, rightSection, rightSectionWidth, theme, ...props }: GetRightSectionProps): {
    rightSection: string | number | true | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal;
    rightSectionWidth: string | number;
    styles: Record<string, any>;
} | {
    rightSection: JSX.Element;
    styles: any;
    rightSectionWidth?: undefined;
};
export {};
//# sourceMappingURL=get-select-right-section-props.d.ts.map