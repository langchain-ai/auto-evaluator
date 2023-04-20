import React from 'react';
import { DefaultProps, Selectors, MantineNumberSize } from '@mantine/styles';
import { TransferListItem, TransferListItemComponent } from '../types';
import useStyles from './RenderList.styles';
export type RenderListStylesNames = Selectors<typeof useStyles>;
export interface RenderListProps extends DefaultProps<RenderListStylesNames> {
    variant: string;
    data: TransferListItem[];
    onSelect(value: string): void;
    selection: string[];
    itemComponent: TransferListItemComponent;
    searchPlaceholder: string;
    query?: string;
    onSearch(value: string): void;
    filter(query: string, item: TransferListItem): boolean;
    nothingFound?: React.ReactNode;
    placeholder?: React.ReactNode;
    title?: React.ReactNode;
    reversed?: boolean;
    showTransferAll?: boolean;
    onMoveAll(): void;
    onMove(): void;
    height: number;
    radius: MantineNumberSize;
    listComponent?: React.FC<any>;
    limit?: number;
    transferIcon?: React.FunctionComponent<{
        reversed: any;
    }>;
    transferAllIcon?: React.FunctionComponent<{
        reversed: any;
    }>;
    transferAllMatchingFilter: boolean;
}
export declare function RenderList({ className, data, onSelect, selection, itemComponent: ItemComponent, listComponent, transferIcon: TransferIcon, transferAllIcon: TransferAllIcon, transferAllMatchingFilter, searchPlaceholder, query, onSearch, filter, nothingFound, placeholder, title, showTransferAll, reversed, onMoveAll, onMove, height, radius, classNames, styles, limit, unstyled, variant, }: RenderListProps): JSX.Element;
export declare namespace RenderList {
    var displayName: string;
}
//# sourceMappingURL=RenderList.d.ts.map