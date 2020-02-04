import React, { useState } from 'react';
import { Header } from '../header/header';
import { ProductsList, ProductsListProps } from '../products-list/products-list';
import { classes, st } from './products-collection-page.st.css';
import { BreadCrumbs, BreadCrumbsProps } from '../bread-crumbs/bread-crumbs';
import { SiteMap } from '../../stores/site-map';

const siteMenu = [
    { title: SiteMap.Collections.title, url: SiteMap.Collections.url },
    { title: SiteMap.Shop.title, url: SiteMap.Shop.url },
    { title: SiteMap.About.title, url: SiteMap.About.url }
];

export interface ProductsCollectionPageProps {
    products: ProductsListProps['products'];
    breadCrumbs: BreadCrumbsProps['items'];
    className?: string;
}

export const ProductsCollectionPage = React.memo<ProductsCollectionPageProps>(props => {
    const { products, breadCrumbs, className } = props;

    const [productsInCart, setProductsInCart] = useState<string[]>([]);

    const onAddToCartButtonClick: ProductsListProps['onAddToCartButtonClick'] = productId => {
        setProductsInCart(products => {
            if (products.includes(productId)) {
                return products.filter(existingProductId => existingProductId !== productId);
            } else {
                return [...products, productId];
            }
        });
    };

    return (
        <div className={st(classes.root, className)}>
            <Header className={classes.header} menuItems={siteMenu} shoppingCartItemsCount={productsInCart.length} />
            <main className={classes.pageBody}>
                <BreadCrumbs className={classes.breadCrumbs} items={breadCrumbs} />
                <ProductsList
                    className={classes.productList}
                    products={products}
                    productsInCart={productsInCart}
                    onAddToCartButtonClick={onAddToCartButtonClick}
                />
            </main>
        </div>
    );
});
