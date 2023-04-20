import { MantineSize, MantineTheme } from '@mantine/styles';
type Breakpoints<T> = Partial<Record<MantineSize | (string & {}), T>>;
export declare function getSortedBreakpoints<T>(breakpoints: Breakpoints<T>, theme: MantineTheme): [string, T][];
export {};
//# sourceMappingURL=get-sorted-breakpoints.d.ts.map