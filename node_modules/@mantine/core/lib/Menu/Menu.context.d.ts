import { MantineNumberSize, ClassNames, Styles } from '@mantine/styles';
import { MenuTriggerEvent } from './Menu.types';
import type { MenuStylesNames } from './Menu';
interface MenuContext {
    toggleDropdown(): void;
    closeDropdownImmediately(): void;
    closeDropdown(): void;
    openDropdown(): void;
    getItemIndex(node: HTMLButtonElement): number;
    setHovered(index: number): void;
    hovered: number;
    closeOnItemClick: boolean;
    loop: boolean;
    trigger: MenuTriggerEvent;
    radius: MantineNumberSize;
    opened: boolean;
    classNames: ClassNames<MenuStylesNames>;
    styles: Styles<MenuStylesNames>;
    unstyled: boolean;
    variant?: string;
}
export declare const MenuContextProvider: ({ children, value }: {
    value: MenuContext;
    children: import("react").ReactNode;
}) => JSX.Element, useMenuContext: () => MenuContext;
export {};
//# sourceMappingURL=Menu.context.d.ts.map