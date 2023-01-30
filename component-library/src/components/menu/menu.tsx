import React from 'react';
import { st, classes } from './menu.st.css.js';

export interface MenuItem {
    title: string;
    url: string;
}

export interface MenuProps {
    items: MenuItem[];
    layout: 'horizontal' | 'vertical';
    className?: string;
}

export const Menu = React.memo(function Menu(props: MenuProps) {
    const { items = [], layout, className } = props;

    return (
        <div className={st(classes.root, { layout }, className)}>
            {items.map((item, index) => {
                return (
                    <a key={index} className={classes.item} href={item.url}>
                        {item.title}
                    </a>
                );
            })}
        </div>
    );
});
