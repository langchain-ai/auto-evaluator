import React from 'react';
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import { SelectItem } from '../types';
import useStyles from './SelectItems.styles';
export type SelectItemsStylesNames = Selectors<typeof useStyles>;
export interface SelectItemsProps extends DefaultProps<SelectItemsStylesNames> {
    data: SelectItem[];
    hovered: number;
    __staticSelector: string;
    isItemSelected?(itemValue: string): boolean;
    uuid: string;
    itemsRefs?: React.MutableRefObject<Record<string, HTMLDivElement>>;
    onItemHover(index: number): void;
    onItemSelect(item: SelectItem): void;
    size: MantineSize;
    itemComponent: React.FC<any>;
    nothingFound?: React.ReactNode;
    creatable?: boolean;
    createLabel?: React.ReactNode;
    variant: string;
}
export declare function SelectItems({ data, hovered, classNames, styles, isItemSelected, uuid, __staticSelector, onItemHover, onItemSelect, itemsRefs, itemComponent: Item, size, nothingFound, creatable, createLabel, unstyled, variant, }: SelectItemsProps): JSX.Element;
export declare namespace SelectItems {
    var displayName: string;
}
//# sourceMappingURL=SelectItems.d.ts.map