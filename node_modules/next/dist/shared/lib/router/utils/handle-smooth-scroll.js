"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleSmoothScroll = handleSmoothScroll;
function handleSmoothScroll(fn, options = {}) {
    const htmlElement = document.documentElement;
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        // In Chrome-based browsers we need to force reflow before calling `scrollTo`.
        // Otherwise it will not pickup the change in scrollBehavior
        // More info here: https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
}

//# sourceMappingURL=handle-smooth-scroll.js.map