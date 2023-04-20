/// <reference types="react" />
import { MantineSize } from '@mantine/styles';
interface SwitchGroupContextValue {
    value: string[];
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    size: MantineSize;
}
export declare const SwitchGroupProvider: import("react").Provider<SwitchGroupContextValue>;
export declare const useSwitchGroupContext: () => SwitchGroupContextValue;
export {};
//# sourceMappingURL=SwitchGroup.context.d.ts.map