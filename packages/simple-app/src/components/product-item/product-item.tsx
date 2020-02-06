import { Button } from '../button/button';
import React from 'react';
import { classes, st } from './product-item.st.css';
import { StarsRating } from '../stars-rating/stars-rating';
import { ImageView } from '../image-view/image-view';
import { CommonClasses } from '../../common/common-classes';

export interface AppProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl: string;
    modelName?: string;
    productId: string;
    productTitle: string;
    price: string;
    isNew?: boolean;

    reviewsAverageRating?: number;
    reviewsCount?: number;

    onAddToCartButtonClick?: (productId: string) => void;
    isAddedToCart?: boolean;
}

export const AppProductItem = React.memo<AppProductItemProps>(props => {
    const {
        productId,
        productTitle,
        modelName,
        imageUrl,
        reviewsCount,
        reviewsAverageRating,
        onAddToCartButtonClick,
        isAddedToCart = false,
        price,
        isNew = false,
        className,
        ...htmlAttributes
    } = props;

    const normalizedRating =
        reviewsAverageRating !== undefined ? Math.min(Math.max(reviewsAverageRating, 0), 5) : undefined;

    const productUrl = `/product/${productId}`;
    const addToCart = onAddToCartButtonClick ? () => onAddToCartButtonClick(productId) : undefined;

    return (
        <div {...htmlAttributes} className={st(classes.root, className)}>
            <div className={classes.sectionMain}>
                <a href={productUrl} className={st(classes.imageLink, CommonClasses.resetAnchor)}>
                    <ImageView
                        src={imageUrl}
                        className={classes.productImage}
                        positionHorizontal={'center'}
                        positionVertical={'center'}
                    />
                </a>
                {isNew && <div className={classes.bannerNew}>New</div>}
                <Button
                    className={st(classes.addToCartButton, { isAddedToCart })}
                    onClick={addToCart}
                    text={isAddedToCart ? 'Remove from cart' : 'Add to cart'}
                />
            </div>

            <ProductInfo
                modelName={modelName}
                price={price}
                productUrl={productUrl}
                productTitle={productTitle}
                rating={normalizedRating}
                reviewsCount={reviewsCount}
            />
        </div>
    );
});

interface ProductInfoProps {
    modelName?: string;
    price: string;
    productUrl: string;
    productTitle: string;
    rating?: number;
    reviewsCount?: number;
}

function ProductInfo({ modelName, price, productUrl, productTitle, rating, reviewsCount }: ProductInfoProps) {
    return (
        <div className={classes.productInfo}>
            <a href={productUrl} className={st(classes.title, CommonClasses.resetAnchor)}>
                {productTitle}
            </a>
            <div className={classes.priceLabel}>{price}</div>
            <div className={classes.modelName}>{modelName}</div>

            {rating !== undefined && (
                <div className={classes.rating}>
                    <StarsRating className={classes.starsRating} rating={rating} />
                    {reviewsCount !== undefined && <div className={classes.reviewsCount}>({reviewsCount} reviews)</div>}
                </div>
            )}
        </div>
    );
}
