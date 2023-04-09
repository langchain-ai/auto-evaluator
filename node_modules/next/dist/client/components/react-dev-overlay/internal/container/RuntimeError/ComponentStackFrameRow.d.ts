/// <reference types="react" />
import type { ComponentStackFrame } from '../../helpers/parse-component-stack';
export declare function ComponentStackFrameRow({ componentStackFrame: { component, file, lineNumber, column }, }: {
    componentStackFrame: ComponentStackFrame;
}): JSX.Element;
