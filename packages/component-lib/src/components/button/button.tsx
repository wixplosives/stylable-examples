import React from 'react';
import { st, classes } from './button.st.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    text?: string;
    icon?: React.ReactElement;
}

export function Button({ className, onClick, text, icon, ...attrs }: ButtonProps) {
    return (
        <button {...attrs} className={st(classes.root, className)} onClick={onClick}>
            {icon}
            {text !== undefined && <span className="text">{text}</span>}
        </button>
    );
}
