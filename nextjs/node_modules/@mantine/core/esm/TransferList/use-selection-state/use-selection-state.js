import { useState } from 'react';

function useSelectionState(initialSelection = [[], []]) {
  const [selection, setSelection] = useState(initialSelection);
  const handleSelect = (listIndex, value) => setSelection((currentSelection) => {
    const listSelection = currentSelection[listIndex];
    let result = listSelection;
    if (typeof value === "string") {
      if (listSelection.includes(value)) {
        result = listSelection.filter((item) => item !== value);
      } else {
        result = [...listSelection, value];
      }
    }
    const clone = [...currentSelection];
    clone[listIndex] = result;
    return clone;
  });
  const handleDeselect = (listIndex, values) => setSelection((currentSelection) => {
    const clone = [...currentSelection];
    clone[listIndex] = currentSelection[listIndex].filter((item) => !values.includes(item));
    return clone;
  });
  const handleDeselectAll = (listIndex) => setSelection((currentSelection) => {
    const clone = [...currentSelection];
    clone[listIndex] = [];
    return clone;
  });
  const handlers = {
    select: handleSelect,
    deselect: handleDeselect,
    deselectAll: handleDeselectAll
  };
  return [selection, handlers];
}

export { useSelectionState };
//# sourceMappingURL=use-selection-state.js.map
