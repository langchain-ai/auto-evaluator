/// <reference types="react" />
import { MantineNumberSize } from '@mantine/styles';
export type ScrollAreaComponent = React.FC<{
    mah: React.CSSProperties['maxHeight'];
    children: React.ReactNode;
}>;
interface ModalContext {
    yOffset: string | number;
    radius: MantineNumberSize;
    scrollAreaComponent: ScrollAreaComponent;
}
export declare const ModalProvider: ({ children, value }: {
    value: ModalContext;
    children: import("react").ReactNode;
}) => JSX.Element, useModalContext: () => ModalContext;
export {};
//# sourceMappingURL=Modal.context.d.ts.map