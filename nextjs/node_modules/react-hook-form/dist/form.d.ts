import * as React from 'react';
import { Control, FieldValues, SubmitHandler } from './types';
export type FormProps<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
> = Partial<{
  control: Control<TFieldValues>;
  children?: React.ReactNode | React.ReactNode[];
  render?: (props: {
    submit: (e?: React.FormEvent) => void;
  }) => React.ReactNode | React.ReactNode[];
  onSubmit: TTransformedValues extends FieldValues
    ? SubmitHandler<TTransformedValues>
    : SubmitHandler<TFieldValues>;
}> &
  Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onError'> &
  (
    | Partial<{
        onSuccess: ({ response }: { response: Response }) => void;
        onError: ({
          response,
          error,
        }:
          | {
              response: Response;
              error?: undefined;
            }
          | {
              response?: undefined;
              error: unknown;
            }) => void;
        headers: Record<string, string>;
        validateStatus: (status: number) => boolean;
        fetcher: undefined;
      }>
    | Partial<{
        onSuccess: undefined;
        onError: undefined;
        validateStatus: undefined;
        headers: undefined;
        fetcher: (
          action: string,
          payload: {
            values?: TFieldValues;
            method: string;
            event?: React.BaseSyntheticEvent;
            formData: FormData;
            formDataJson: string;
          },
        ) => Promise<void> | void;
      }>
  );
/**
 * Form component to manage submission.
 *
 * @param props - to setup submission detail. {@link FormProps}
 *
 * @returns form component or headless render prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <Form action="/api" control={control}>
 *       <input {...register("name")} />
 *       <p>{errors?.root?.server && 'Server error'}</p>
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
export declare function Form<
  T extends FieldValues,
  U extends FieldValues | undefined = undefined,
>(props: FormProps<T, U>): JSX.Element;
//# sourceMappingURL=form.d.ts.map
