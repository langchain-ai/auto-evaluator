import React from 'react';
export interface SelectItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'value'> {
    label: React.ReactNode;
    value?: string;
}
export declare const DefaultItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DefaultItem.d.ts.map