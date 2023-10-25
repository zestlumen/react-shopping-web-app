import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
// import { useQuery } from '@tanstack/react-query';
// import { getProducts } from '../api/firebase';

export default function Products() {
    // const {
    //     isLoading,
    //     error,
    //     data: products,
    // } = useQuery(['products'], getProducts, { staleTime: 1000 * 60 });

    //productsQuery만 받아와서 isLoading인지 error인지 data를 낱개로 풀어서 가져와서 쓸수 있고
    const {
        productsQuery: { isLoading, error, data: products }
    } = useProducts();

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4' >
                {products && products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </>
    );
}

