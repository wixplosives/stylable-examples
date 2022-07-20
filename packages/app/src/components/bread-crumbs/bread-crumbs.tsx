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

export const BreadCrumbs = React.memo<BreadCrumbsProps>(function BreadCrumbs(props) {
    const { items = [], className } = props;

    return (
        <div className={st(classes.root, className)}>
            {items.map((item, index, items) => (
                <Crumb key={index} menuItem={item} isCurrent={index === items.length - 1} />
            ))}
        </div>
    );
});

/**
 * This is an example of a component that does not have it's own root class.
 * That's because it's a private child component of BreadCrumbs and it's existence is for code structure only.
 */
function Crumb({ menuItem, isCurrent }: { menuItem: BreadCrumbsItem; isCurrent: boolean }) {
    return isCurrent ? (
        <div className={st(classes.breadCrumbItem, { isCurrent: true })}>{menuItem.title}</div>
    ) : (
        <>
            <a className={classes.breadCrumbItem} href={menuItem.url}>
                {menuItem.title}
            </a>
            <div className={classes.separator}>{`>`}</div>
        </>
    );
}
