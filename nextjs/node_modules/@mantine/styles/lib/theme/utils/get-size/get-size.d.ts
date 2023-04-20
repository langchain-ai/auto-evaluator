import { MantineNumberSize } from '../../types';
export declare function getSize<Sizes extends Record<string, any>, Key extends keyof Sizes, Size extends MantineNumberSize>({ size, sizes, units, }: {
    size: Size;
    sizes: Sizes;
    units?: 'em' | 'rem';
}): Size extends Key ? Sizes[Size] : Size extends number ? string : Size;
//# sourceMappingURL=get-size.d.ts.map