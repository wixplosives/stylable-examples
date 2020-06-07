import React from 'react';
import { st, classes } from './menu.st.css';

export interface MenuItem {
    title: string;
    url: string;
}

export interface MenuProps {
    menuItems: MenuItem[];
    layout: 'horizontal' | 'vertical';
    className?: string;
}

export const Menu = React.memo<MenuProps>(function Menu(props) {
    const { menuItems = [], layout, className } = props;

    return (
        <div className={st(classes.root, { layout }, className)}>
            {menuItems.map((menuItem, index) => {
                return (
                    <a key={index} className={classes.menuItem} href={menuItem.url}>
                        {menuItem.title}
                    </a>
                );
            })}
        </div>
    );
});
