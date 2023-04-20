import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { RenderListStylesNames } from './RenderList/RenderList';
import { Selection } from './use-selection-state/use-selection-state';
import { TransferListData, TransferListItemComponent, TransferListItem } from './types';
export type TransferListStylesNames = RenderListStylesNames;
export interface TransferListProps extends DefaultProps<TransferListStylesNames>, Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange' | 'placeholder'> {
    variant?: string;
    /** Current value */
    value: TransferListData;
    /** Called when value changes */
    onChange(value: TransferListData): void;
    /** Initial items selection */
    initialSelection?: Selection;
    /** Custom item component */
    itemComponent?: TransferListItemComponent;
    /** Controlled search queries */
    searchValues?: [string, string];
    /** Called when one of the search queries changes */
    onSearch?(value: [string, string]): void;
    /** Search fields placeholder */
    searchPlaceholder?: string | [string, string];
    /** Nothing found message */
    nothingFound?: React.ReactNode | [React.ReactNode, React.ReactNode];
    /** Displayed when a list is empty and there is no search query */
    placeholder?: React.ReactNode | [React.ReactNode, React.ReactNode];
    /** Function to filter search results */
    filter?(query: string, item: TransferListItem): boolean;
    /** Lists titles */
    titles?: [string, string];
    /** List items height */
    listHeight?: number;
    /** Change list component, can be used to add custom scrollbars */
    listComponent?: any;
    /** Breakpoint at which list will collapse to single column layout */
    breakpoint?: MantineNumberSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Whether to hide the transfer all button */
    showTransferAll?: boolean;
    /** Limit amount of items showed at a time */
    limit?: number;
    /** Change icon used for the transfer selected control */
    transferIcon?: React.FunctionComponent<{
        reversed: boolean;
    }>;
    /** Change icon used for the transfer all control */
    transferAllIcon?: React.FunctionComponent<{
        reversed: boolean;
    }>;
    /** Whether to transfer only items matching {@link filter} when clicking the transfer all control */
    transferAllMatchingFilter?: boolean;
}
export declare function defaultFilter(query: string, item: TransferListItem): boolean;
export declare const TransferList: React.ForwardRefExoticComponent<TransferListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TransferList.d.ts.map