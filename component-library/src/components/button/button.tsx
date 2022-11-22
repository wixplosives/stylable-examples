import type React from 'react';
import { st, classes } from './button.st.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text?: string;
    icon?: React.ReactNode;
}

export function Button({ className, onClick, text, icon, ...attrs }: ButtonProps) {
    return (
        <button {...attrs} className={st(classes.root, className)} onClick={onClick}>
            {icon}
            {text !== undefined && <span className="text">{text}</span>}
        </button>
    );
}
