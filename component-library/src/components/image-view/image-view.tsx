import React from 'react';
import { style, classes, vars } from './image-view.st.css.js';

export interface ImageViewProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    resizeMode?: 'fill' | 'cover' | 'contain';
    positionVertical?: 'top' | 'center' | 'bottom';
    positionHorizontal?: 'left' | 'center' | 'right';
    src: string;
    className?: string;
}

export const ImageView = React.memo(function ImageView(props: ImageViewProps) {
    const {
        resizeMode = 'contain',
        positionVertical = 'top',
        positionHorizontal = 'center',
        src,
        className,
        ...attrs
    } = props;
    return (
        <img
            {...attrs}
            src={src}
            className={style(classes.root, className)}
            style={{
                [vars.objectFit]: resizeMode,
                [vars.objectPositionVertical]: positionVertical,
                [vars.objectPositionHorizontal]: positionHorizontal,
            }}
        />
    );
});
