import React from 'react';
import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/styles';
import useStyles, { ImageStylesParams } from './Image.styles';
export type ImageStylesNames = Selectors<typeof useStyles>;
export interface ImageProps extends DefaultProps<ImageStylesNames, ImageStylesParams>, Omit<React.ComponentPropsWithoutRef<'div'>, 'placeholder'> {
    variant?: string;
    /** Image src */
    src?: string | null;
    /** Image alt text, used as title for placeholder if image was not loaded */
    alt?: string;
    /** Image object-fit property */
    fit?: React.CSSProperties['objectFit'];
    /** Image width, defaults to 100%, cannot exceed 100% */
    width?: number | string;
    /** Image height, defaults to original image height adjusted to given width */
    height?: number | string;
    /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
    radius?: MantineNumberSize;
    /** Enable placeholder when image is loading and when image fails to load */
    withPlaceholder?: boolean;
    /** Customize placeholder content */
    placeholder?: React.ReactNode;
    /** Props spread to img element */
    imageProps?: React.ComponentPropsWithoutRef<'img'>;
    /** Get image element ref */
    imageRef?: React.ForwardedRef<HTMLImageElement>;
    /** Image figcaption, displayed below image */
    caption?: React.ReactNode;
}
export declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Image.d.ts.map