import React from 'react';
import useProducts from '../hooks/useProducts';
import AllProducts from '../pages/AllProducts';
import { Link, useNavigate } from 'react-router-dom';

export default function Category() {
    const { productsQuery: { data: products } } = useProducts();
    const dataCategories = products && products.map((product) => { return product.category });
    const arrCategory = [...new Set(dataCategories)];
    const category = ['ALL', ...arrCategory.filter((f) => f !== 'ETC'), 'ETC'];
    const navigate = useNavigate();

    return (
        <nav>
            <ul className='flex gap-4 font-bold'>
                {category.map((value, index) =>
                    <li
                        className='cursor-pointer border-transparent border-b-4 hover:border-brand'
                        key={index}
                        onClick={() => navigate(`/products/${value}`)}
                    >
                        {value}
                    </li>
                )
                }
            </ul >
        </nav >

    );
}



