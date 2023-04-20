import { cloneElement } from 'react';
import { isElement } from '@mantine/utils';
import { useFocusTrap, useMergedRef } from '@mantine/hooks';

function FocusTrap({
  children,
  active = true,
  refProp = "ref"
}) {
  const focusTrapRef = useFocusTrap(active);
  const ref = useMergedRef(focusTrapRef, children == null ? void 0 : children.ref);
  if (!isElement(children)) {
    return children;
  }
  return cloneElement(children, { [refProp]: ref });
}
FocusTrap.displayName = "@mantine/core/FocusTrap";

export { FocusTrap };
//# sourceMappingURL=FocusTrap.js.map
