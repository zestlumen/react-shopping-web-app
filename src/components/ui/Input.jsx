import React from 'react';

export default function Input({ type, text }) {
    return <input classname='outline' type={type} placeholder={text} />;
}

