interface GetCurveProps {
    size: number;
    thickness: number;
    sum: number;
    value: number;
    root: boolean;
    offset: number;
}
export declare function getCurveProps({ size, thickness, sum, value, root, offset }: GetCurveProps): {
    strokeWidth: number;
    cx: number;
    cy: number;
    r: number;
    transform: string;
    strokeDasharray: string;
    strokeDashoffset: number;
};
export {};
//# sourceMappingURL=get-curve-props.d.ts.map