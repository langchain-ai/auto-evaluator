/// <reference types="react" />
import { MantineSize } from '@mantine/styles';
interface CheckboxGroupContextValue {
    value: string[];
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    size: MantineSize;
}
export declare const CheckboxGroupProvider: import("react").Provider<CheckboxGroupContextValue>;
export declare const useCheckboxGroupContext: () => CheckboxGroupContextValue;
export {};
//# sourceMappingURL=CheckboxGroup.context.d.ts.map