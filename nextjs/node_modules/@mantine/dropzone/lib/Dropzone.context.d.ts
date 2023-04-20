export interface DropzoneContextValue {
    idle: boolean;
    accept: boolean;
    reject: boolean;
}
export declare const DropzoneProvider: ({ children, value }: {
    value: DropzoneContextValue;
    children: import("react").ReactNode;
}) => JSX.Element, useDropzoneContext: () => DropzoneContextValue;
//# sourceMappingURL=Dropzone.context.d.ts.map