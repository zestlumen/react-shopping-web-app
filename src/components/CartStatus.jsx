import React from 'react';
import { GiShoppingBag } from 'react-icons/gi';
import useCarts from '../hooks/useCarts';

export default function CartStatus() {
    const {
        cartQuery: { data: products }
    } = useCarts();

    return (
        <div className='relative flex items-center'>
            <GiShoppingBag className='text-sm  mr-0.5' /><span className='text-[8px] hidden md:block'> SHOPPING BAG</span>
            {products && <p className='absolute w-3 h-3 text-center bg-brand text-white text-[8px] rounded-full -top-1 left-2'>{products.length}</p>}
        </div>
    );
}

