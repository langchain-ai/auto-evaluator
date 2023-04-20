import type { SelectItem } from '../../Select/types';
interface FilterData {
    data: SelectItem[];
    limit: number;
    searchable: boolean;
    searchValue: string;
    filter(value: string, selected: boolean, item: SelectItem): boolean;
    value: string[];
    disableSelectedItemFiltering?: boolean;
}
export declare function filterData({ data, searchable, limit, searchValue, filter, value, disableSelectedItemFiltering, }: FilterData): any[];
export {};
//# sourceMappingURL=filter-data.d.ts.map