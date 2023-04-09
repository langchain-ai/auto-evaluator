export function isAppRouteRoute(route) {
    return route.endsWith("/route");
}
// TODO: support more metadata routes
const staticMetadataRoutes = [
    "robots.txt",
    "sitemap.xml"
];
export function isMetadataRoute(route) {
    // Remove the 'app/' or '/' prefix, only check the route name since they're only allowed in root app directory
    const filename = route.replace(/^app\//, "").replace(/^\//, "");
    return staticMetadataRoutes.includes(filename);
}

//# sourceMappingURL=is-app-route-route.js.map