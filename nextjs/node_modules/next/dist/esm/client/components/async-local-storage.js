class FakeAsyncLocalStorage {
    disable() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
    exit() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
    enterWith() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
}
export function createAsyncLocalStorage() {
    if (globalThis.AsyncLocalStorage) {
        return new globalThis.AsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}

//# sourceMappingURL=async-local-storage.js.map