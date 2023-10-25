import React from 'react';

export default function Banner() {
    return (
        <section className='h-96 bg-yellow-900 relative rounded-lg mr-4 ml-4'>
            <div className='w-full h-full bg-cover bg-banner opacity-80 rounded-lg'></div>
            <div className='absolute w-full top-32 text-center drop-shadow-2x '>
                <h2 className='text-6xl font-semibold text-white'>Mid-Century Modern</h2>
                <p className='text-2xl mt-4 text-gray-100 font-thin'>Practicality And Concise Design</p>
            </div>
        </section>
    );
}

