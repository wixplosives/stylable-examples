import { classes, st } from './products-list.st.css';
import * as React from 'react';
import { IProduct } from '../../stores/products-store';
import { AppProductItem as ProductItem, AppProductItemProps } from '../product-item/product-item';

export interface ProductsListProps {
    products?: IProduct[];
    onAddToCartButtonClick?: AppProductItemProps['onAddToCartButtonClick'];
    productsInCart?: string[];
    className?: string;
}

export const ProductsList = React.memo<ProductsListProps>(props => {
    const { products = [], productsInCart = [], onAddToCartButtonClick, className } = props;

    const productItems = products.map(product => {
        return (
            <ProductItem
                className={classes.productItem}
                key={product.productId}
                imageUrl={product.imageUrl}
                modelName={product.modelName}
                productId={product.productId}
                productTitle={product.productTitle}
                price={product.price}
                isNew={product.isNew}
                reviewsAverageRating={product.reviewsAverageRating}
                reviewsCount={product.reviewsCount}
                onAddToCartButtonClick={onAddToCartButtonClick}
                isAddedToCart={productsInCart.includes(product.productId)}
            />
        );
    });

    return <div className={st(classes.root, className)}>{productItems}</div>;
});
