import React from 'react';

export default function PriceCard({ text, price }) {
    return (
        <div className='pb-7 mx-2 text-center text-lg md:text-xl'>
            <p className='font-semibold border-b-2 p-2'>{text}</p>
            <p className='font-bold text-brand py-5 text-xl md:text-2xl'>￦ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        </div>
    );
}

