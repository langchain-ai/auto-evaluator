import { ClassNames, MantineColor, MantineNumberSize, Styles } from '@mantine/styles';
import type { PaginationStylesNames } from './PaginationRoot/PaginationRoot';
interface PaginationContext {
    total: number;
    range: (number | 'dots')[];
    active: number;
    disabled: boolean;
    color: MantineColor;
    radius: MantineNumberSize;
    getItemProps?(page: number): Record<string, any>;
    onChange(page: number): void;
    onNext(): void;
    onPrevious(): void;
    onFirst(): void;
    onLast(): void;
    stylesApi: {
        name: string;
        classNames?: ClassNames<PaginationStylesNames>;
        styles?: Styles<PaginationStylesNames>;
        unstyled?: boolean;
        variant?: string;
        size?: MantineNumberSize;
    };
}
export declare const PaginationProvider: ({ children, value }: {
    value: PaginationContext;
    children: import("react").ReactNode;
}) => JSX.Element, usePaginationContext: () => PaginationContext;
export {};
//# sourceMappingURL=Pagination.context.d.ts.map