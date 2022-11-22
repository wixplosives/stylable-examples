import type React from 'react';
import { st, classes } from './card.st.css';

export function Card({ className, children, ...attrs }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...attrs} className={st(classes.root, className)}>
            {children}
        </div>
    );
}
