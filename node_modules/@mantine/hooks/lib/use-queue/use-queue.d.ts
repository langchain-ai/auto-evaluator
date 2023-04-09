export declare function useQueue<T>({ initialValues, limit }: {
    initialValues?: T[];
    limit: number;
}): {
    state: T[];
    queue: T[];
    add: (...items: T[]) => void;
    update: (fn: (state: T[]) => T[]) => void;
    cleanQueue: () => void;
};
//# sourceMappingURL=use-queue.d.ts.map