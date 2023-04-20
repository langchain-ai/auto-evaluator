import { HsvaColor, RgbaColor, ColorFormat } from '../types';
export declare function hsvaToRgbaObject({ h, s, v, a }: HsvaColor): RgbaColor;
export declare function hsvaToRgba(color: HsvaColor, includeAlpha: boolean): string;
export declare function hsvaToHsl({ h, s, v, a }: HsvaColor, includeAlpha: boolean): string;
export declare function hsvaToHex(color: HsvaColor): string;
export declare function hsvaToHexa(color: HsvaColor): string;
export declare function convertHsvaTo(format: ColorFormat, color: HsvaColor): string;
//# sourceMappingURL=converters.d.ts.map