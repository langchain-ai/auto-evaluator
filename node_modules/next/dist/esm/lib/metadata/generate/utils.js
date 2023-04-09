function resolveAsArrayOrUndefined(value) {
    if (typeof value === "undefined" || value === null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [
        value
    ];
}
export { resolveAsArrayOrUndefined };

//# sourceMappingURL=utils.js.map