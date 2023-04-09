import React from 'react';
import { MantineNumberSize } from '@mantine/styles';
interface ContextValue {
    spacing: MantineNumberSize;
}
interface AvatarGroupProviderProps extends ContextValue {
    children: React.ReactNode;
}
export declare function AvatarGroupProvider({ spacing, children }: AvatarGroupProviderProps): JSX.Element;
export declare function useAvatarGroupContext(): {
    withinGroup: boolean;
    spacing: MantineNumberSize;
};
export {};
//# sourceMappingURL=AvatarGroup.context.d.ts.map