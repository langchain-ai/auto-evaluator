import { DeepPartial, FieldValues, UseFormReturn } from '../types';
export declare function createFormControl<TFieldValues extends FieldValues = FieldValues, TContext = any>(props: Partial<{
    mode: keyof import("../types").ValidationMode;
    reValidateMode: "onSubmit" | "onChange" | "onBlur";
    defaultValues: DeepPartial<TFieldValues> | ((payload?: unknown) => Promise<TFieldValues>);
    values: TFieldValues;
    resetOptions: Partial<{
        keepDirtyValues: boolean;
        keepErrors: boolean;
        keepDirty: boolean;
        keepValues: boolean;
        keepDefaultValues: boolean;
        keepIsSubmitted: boolean;
        keepTouched: boolean;
        keepIsValid: boolean;
        keepSubmitCount: boolean;
    }> | undefined;
    resolver: import("../types").Resolver<TFieldValues, TContext>;
    context: TContext;
    shouldFocusError: boolean;
    shouldUnregister: boolean;
    shouldUseNativeValidation: boolean;
    criteriaMode: import("../types").CriteriaMode;
    delayError: number;
}> | undefined, flushRootRender: () => void): Omit<UseFormReturn<TFieldValues, TContext>, 'formState'>;
//# sourceMappingURL=createFormControl.d.ts.map