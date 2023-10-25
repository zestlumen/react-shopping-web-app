import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, product: { id, image, title, category, price } }) {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => {
                navigate(`/products/${id}`, { state: { product } });
            }}
            className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
        >
            <div className='h-[380px] flex items-center bg-zinc-100 '>
                <img className='w-full' src={image} alt={title} />
            </div>
            <div className='mt-4 px-2 text-[10px] flex justify-between items-center'>
                <h3 className='truncate'>{title}</h3>
                <p className=' text-gray-600'>{category}</p>
            </div>
            <p className='px-2 pt-2 mb-4 text-[12px] text-brand font-bold'>{`￦ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</p>

        </li>
    );
}

