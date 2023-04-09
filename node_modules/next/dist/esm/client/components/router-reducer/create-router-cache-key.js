export function createRouterCacheKey(segment) {
    return Array.isArray(segment) ? `${segment[0]}|${segment[1]}|${segment[2]}` : segment;
}

//# sourceMappingURL=create-router-cache-key.js.map