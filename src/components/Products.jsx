import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';

export default function Products({ category }) {
    const {
        productsQuery: { isLoading, error, data: products }
    } = useProducts();

    const filteredProducts = (category !== 'ALL') ?
        (products.filter((product) => product.category === category)) : products;

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4' >
                {filteredProducts && filteredProducts.map((product) =>
                    <ProductCard key={product.id} product={product} />
                )}
            </ul>
        </>
    );
}

