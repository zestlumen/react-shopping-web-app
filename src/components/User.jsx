import React from 'react';


export default function User({ user: { photoURL, displayName } }) {

    return (
        <div className='flex items-center shrink-0'>
            <img className='w-5 h-5 rounded-full mr-2' src={photoURL} alt={displayName} />
            <span className='hidden md:block text-[8px]'>{displayName}</span>
        </div >
    );
}

