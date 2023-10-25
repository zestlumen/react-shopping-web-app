import React from 'react';

export default function Button({ text, onClick, disabled }) {
    return <button className='bg-black py-2 px-4 text-white rounded-sm hover:bg-brand ' onClick={onClick} disabled={disabled}>{text}</button>;
}

