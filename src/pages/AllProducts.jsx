import React from 'react';
import Products from '../components/Products';
import { useLocation, useParams } from 'react-router-dom';

export default function AllProducts() {
    const { category } = useParams();

    return (
        <div>
            <Products category={category.toUpperCase()} />
        </div>
    );
}

