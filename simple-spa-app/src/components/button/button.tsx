import React from 'react';
import { st, classes } from './button.st.css';

interface ButtonProps {
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    text?: string;
    icon?: React.ReactElement;
}

export function Button({ className, onClick, text, icon, ...attrs }: ButtonProps) {
    return (
        <button className={st(classes.root, className)} onClick={onClick} {...attrs}>
            {icon !== undefined && <span className={classes.icon}>{icon}</span>}
            {text !== undefined && <span className={classes.text}>{text}</span>}
        </button>
    );
}
