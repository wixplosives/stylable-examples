import React from 'react';
import { st, classes } from './bread-crumbs.st.css';

export interface BreadCrumbsItem {
    title: string;
    url: string;
}

export interface BreadCrumbsProps {
    items: BreadCrumbsItem[];
    className?: string;
}

export const BreadCrumbs = React.memo<BreadCrumbsProps>(props => {
    const { items = [], className } = props;

    const menuItemsViews = items.map((menuItem, index) => {
        const isCurrent = index === items.length - 1;

        if (isCurrent) {
            return (
                <div key={index} className={st(classes.breadCrumbItem, { isCurrent: true })}>
                    {menuItem.title}
                </div>
            );
        } else {
            return (
                <React.Fragment key={index}>
                    <a className={classes.breadCrumbItem} href={menuItem.url}>
                        {menuItem.title}
                    </a>
                    <div className={classes.separator}>{`>`}</div>
                </React.Fragment>
            );
        }
    });

    return <div className={st(classes.root, className)}>{menuItemsViews}</div>;
});
