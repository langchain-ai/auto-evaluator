import type { AutocompleteItem } from '../Autocomplete';
interface FilterData {
    data: AutocompleteItem[];
    limit: number;
    value: string;
    filter(value: string, item: AutocompleteItem): boolean;
}
export declare function filterData({ data, limit, value, filter }: FilterData): any[];
export {};
//# sourceMappingURL=filter-data.d.ts.map