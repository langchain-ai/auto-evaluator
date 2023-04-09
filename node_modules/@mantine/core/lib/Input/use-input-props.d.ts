import { DefaultProps, MantineStyleSystemProps } from '@mantine/styles';
import { InputWrapperBaseProps } from './InputWrapper/InputWrapper';
import { InputSharedProps } from './Input';
interface BaseProps extends InputWrapperBaseProps, InputSharedProps, DefaultProps {
    __staticSelector?: string;
    id?: string;
}
export declare function useInputProps<T extends BaseProps, U extends Partial<T>>(component: string, defaultProps: U, props: T): Omit<T & { [Key in Extract<keyof T, never>]-?: {}[Key] | NonNullable<T[Key]>; }, "size" | "style" | "className" | "sx" | "classNames" | "styles" | "unstyled" | "label" | "variant" | "id" | "required" | "__staticSelector" | "error" | "description" | "withAsterisk" | "labelProps" | "descriptionProps" | "errorProps" | "inputContainer" | "inputWrapperOrder" | "wrapperProps"> & {
    classNames: Partial<Record<never, string>>;
    styles: import("@mantine/styles").Styles<never, Record<string, any>>;
    unstyled: boolean;
    wrapperProps: {
        label: import("react").ReactNode;
        description: import("react").ReactNode;
        error: import("react").ReactNode;
        required: boolean;
        classNames: Partial<Record<never, string>>;
        className: string;
        __staticSelector: string;
        sx: import("@mantine/styles").Sx | import("@mantine/styles").Sx[];
        errorProps: Record<string, any>;
        labelProps: Record<string, any>;
        descriptionProps: Record<string, any>;
        unstyled: boolean;
        styles: import("@mantine/styles").Styles<never, Record<string, any>>;
        id: string;
        size: import("@mantine/styles").MantineSize;
        style: import("react").CSSProperties;
        inputContainer: (children: import("react").ReactNode) => import("react").ReactNode;
        inputWrapperOrder: ("input" | "label" | "error" | "description")[];
        withAsterisk: boolean;
        variant: import("@mantine/styles").Variants<"default" | "filled" | "unstyled">;
    } & MantineStyleSystemProps;
    inputProps: {
        required: boolean;
        classNames: Partial<Record<never, string>>;
        styles: import("@mantine/styles").Styles<never, Record<string, any>>;
        unstyled: boolean;
        id: string;
        size: import("@mantine/styles").MantineSize;
        __staticSelector: string;
        error: import("react").ReactNode;
        variant: import("@mantine/styles").Variants<"default" | "filled" | "unstyled">;
    };
};
export {};
//# sourceMappingURL=use-input-props.d.ts.map