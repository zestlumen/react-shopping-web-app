import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import useCarts from '../hooks/useCarts';
// import { addOrUpdateToCart, removeFromCart } from '../api/firebase';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

export default function CartItem({ product, product: { id, image, title, option, quantity, price, } }) {

    const { addOrUpdateItem, removeItem } = useCarts();

    const handleMinus = () => {
        if (quantity < 2) return;
        addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
        // addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
    };

    const handlePlus = () =>
        addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
    // addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });

    const handleDelete = () => removeItem.mutate(id);
    // removeFromCart(uid, id);

    return (
        <li className='flex justify-between my-2 items-center'>
            <img className='w-24 md:w-48 rounded-lg' src={image} alt={title} />
            <div className='flex flex-1 justify-between ml-4'>
                <div className='basis-3/5 flex flex-col gap-2'>
                    <p className='text-lg font-semibold'>{title}</p>
                    <p className=' text-brand font-semibold'>￦ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    <p className='text-sm'> 옵션: {option}</p>
                </div>
                <div className='text-2xl flex items-center'>
                    <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
                    <RiDeleteBin6Fill className={ICON_CLASS} onClick={handleDelete} />
                </div>
            </div>
        </li>
    );
}

