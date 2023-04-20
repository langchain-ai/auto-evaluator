interface GroupData {
    data: {
        group?: string;
    }[];
}
export declare function groupOptions({ data }: GroupData): any[];
export declare function getGroupedOptions<T extends any[]>(data: T): {
    grouped: ({
        type: 'item';
        item: T[number];
        index: number;
    } | {
        type: 'label';
        label: string;
    })[];
    unGrouped: {
        type: 'item';
        item: T[number];
        index: number;
    }[];
    items: ({
        type: 'item';
        item: T[number];
        index: number;
    } | {
        type: 'label';
        label: string;
    })[];
    hasItems: boolean;
};
export {};
//# sourceMappingURL=group-options.d.ts.map