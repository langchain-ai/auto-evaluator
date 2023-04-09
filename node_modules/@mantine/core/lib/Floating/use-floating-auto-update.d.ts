/// <reference types="react" />
import { FloatingPosition } from './types';
interface Payload {
    opened: boolean;
    floating: {
        update(): void;
        refs: {
            floating: React.MutableRefObject<any>;
            reference: React.MutableRefObject<any>;
        };
    };
    positionDependencies: any[];
    position: FloatingPosition;
}
export declare function useFloatingAutoUpdate({ opened, floating, position, positionDependencies, }: Payload): void;
export {};
//# sourceMappingURL=use-floating-auto-update.d.ts.map