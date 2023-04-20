import { MantineColor, MantineNumberSize } from '@mantine/styles';
export interface NotificationStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    withTitle: boolean;
}
declare const _default: (params: NotificationStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        closeButton: string;
        icon: string;
        root: string;
        body: string;
        loader: string;
        title: string;
        description: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Notification.styles.d.ts.map