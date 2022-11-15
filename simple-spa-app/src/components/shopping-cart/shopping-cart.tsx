import React from 'react';
import { st, classes } from './shopping-cart.st.css';

export interface ShoppingCartProps {
    className?: string;
    itemsCount: number;
}

export const ShoppingCart = React.memo<ShoppingCartProps>(function ShoppingCart(props) {
    const { className, itemsCount } = props;

    return (
        <a href={'#'} className={st(classes.root, className)}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21.5">
                    <g fill="none" fillRule="evenodd" stroke="#000" className={classes.shape}>
                        <path d="M.5 6v13.5A1.5 1.5 0 002 21h15a1.5 1.5 0 001.5-1.5V6z" />
                    </g>
                    <g fill="none" fillRule="evenodd" stroke="#000" className={classes.shape}>
                        <path d="M14.917 5.5c0-2.761-2.425-5-5.417-5s-5.417 2.239-5.417 5" />
                    </g>
                </svg>
                {itemsCount ? <div className={classes.itemsCount}>{itemsCount}</div> : null}
            </div>
        </a>
    );
});
