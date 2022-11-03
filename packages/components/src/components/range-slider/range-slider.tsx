import React from 'react';
import { st, classes } from './range-slider.st.css';

export function RangeSlider({ className, children, ...attrs }: React.HTMLAttributes<HTMLInputElement>) {
    return (
        <input {...attrs} type="range" className={st(classes.root, classes.slider, className)}>
            {children}
        </input>
    );
}
