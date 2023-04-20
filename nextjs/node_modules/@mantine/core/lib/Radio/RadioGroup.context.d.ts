/// <reference types="react" />
import { MantineSize } from '@mantine/styles';
interface RadioGroupContextValue {
    size: MantineSize;
    value: string;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    name: string;
}
export declare const RadioGroupProvider: import("react").Provider<RadioGroupContextValue>;
export declare const useRadioGroupContext: () => RadioGroupContextValue;
export {};
//# sourceMappingURL=RadioGroup.context.d.ts.map