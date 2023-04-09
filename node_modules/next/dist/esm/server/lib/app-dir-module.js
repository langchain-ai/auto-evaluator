export async function getLayoutOrPageModule(loaderTree) {
    const { layout , page  } = loaderTree[2];
    const isLayout = typeof layout !== "undefined";
    const isPage = typeof page !== "undefined";
    return isLayout ? await layout[0]() : isPage ? await page[0]() : undefined;
}

//# sourceMappingURL=app-dir-module.js.map