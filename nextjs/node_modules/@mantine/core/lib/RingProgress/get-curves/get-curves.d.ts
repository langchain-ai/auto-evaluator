/// <reference types="react" />
import type { MantineColor } from '@mantine/styles';
interface CurveData extends React.ComponentPropsWithRef<'circle'> {
    value: number;
    color: MantineColor;
    tooltip?: React.ReactNode;
}
interface RootCurveData extends React.ComponentPropsWithRef<'circle'> {
    color?: MantineColor;
}
interface GetCurves {
    sections: CurveData[];
    size: number;
    thickness: number;
    renderRoundedLineCaps: boolean;
    rootColor?: MantineColor;
}
interface Curve {
    sum: number;
    offset: number;
    root: boolean;
    data: CurveData | RootCurveData;
    lineRoundCaps?: boolean;
}
export declare function getCurves({ size, thickness, sections, renderRoundedLineCaps, rootColor, }: GetCurves): Curve[];
export {};
//# sourceMappingURL=get-curves.d.ts.map