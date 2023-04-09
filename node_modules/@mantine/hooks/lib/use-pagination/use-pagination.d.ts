export declare const DOTS = "dots";
export interface PaginationParams {
    /** Page selected on initial render, defaults to 1 */
    initialPage?: number;
    /** Controlled active page number */
    page?: number;
    /** Total amount of pages */
    total: number;
    /** Siblings amount on left/right side of selected page, defaults to 1 */
    siblings?: number;
    /** Amount of elements visible on left/right edges, defaults to 1  */
    boundaries?: number;
    /** Callback fired after change of each page */
    onChange?: (page: number) => void;
}
export declare function usePagination({ total, siblings, boundaries, page, initialPage, onChange, }: PaginationParams): {
    range: (number | "dots")[];
    active: number;
    setPage: (pageNumber: number) => void;
    next: () => void;
    previous: () => void;
    first: () => void;
    last: () => void;
};
//# sourceMappingURL=use-pagination.d.ts.map