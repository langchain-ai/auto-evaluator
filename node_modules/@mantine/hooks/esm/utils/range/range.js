function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

export { range };
//# sourceMappingURL=range.js.map
