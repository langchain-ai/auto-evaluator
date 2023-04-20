import type { StyleProperty } from '../get-responsive-value/get-responsive-value';
import type { SystemValueType } from '../value-getters/value-getters';
export interface SystemPropData {
    type: SystemValueType;
    property: StyleProperty;
}
export declare const SYSTEM_PROPS: Record<string, SystemPropData>;
//# sourceMappingURL=system-props.d.ts.map