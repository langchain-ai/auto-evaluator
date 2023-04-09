import { RouteMatcher } from "./route-matcher";
export class AppPageRouteMatcher extends RouteMatcher {
    get identity() {
        return `${this.definition.pathname}?__nextParallelPaths=${this.definition.appPaths.join(",")}}`;
    }
}

//# sourceMappingURL=app-page-route-matcher.js.map