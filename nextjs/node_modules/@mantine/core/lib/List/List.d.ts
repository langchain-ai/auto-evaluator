import React from 'react';
import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { ListItem, ListItemStylesNames } from './ListItem/ListItem';
import useStyles from './List.styles';
export type ListStylesNames = ListItemStylesNames | Selectors<typeof useStyles>;
export interface ListProps extends DefaultProps<ListStylesNames>, Omit<React.ComponentPropsWithRef<'ol'>, 'type'> {
    variant?: string;
    /** <List.Item /> components only */
    children: React.ReactNode;
    /** List type: ol or ul */
    type?: 'ordered' | 'unordered';
    /** Include padding-left to offset list from main content */
    withPadding?: boolean;
    /** Font size from theme or number to set value */
    size?: MantineNumberSize;
    /** Icon that should replace list item dot */
    icon?: React.ReactNode;
    /** Spacing between items from theme or number to set value */
    spacing?: MantineNumberSize;
    /** Center items with icon */
    center?: boolean;
    /** List style */
    listStyleType?: React.CSSProperties['listStyleType'];
}
type ListComponent = ForwardRefWithStaticComponents<ListProps, {
    Item: typeof ListItem;
}>;
export declare const List: ListComponent;
export {};
//# sourceMappingURL=List.d.ts.map