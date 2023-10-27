import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCarts';

export default function ProductDetail() {

    const { addOrUpdateItem } = useCarts();
    const {
        state: {
            product: { id, image, title, description, category, price, options }
        }
    } = useLocation();
    const [success, setSuccess] = useState();
    const [selected, setSelected] = useState(options && options[0]);
    const handleSelect = (e) => setSelected(e.target.value);
    const handleClick = (e) => {
        const product = { id, image, title, price, option: selected, quantity: 1 };
        addOrUpdateItem.mutate(product, {
            onSuccess: () => {
                setSuccess('장바구니에 추가되었습니다.');
                setTimeout(() => setSuccess(null), 3000);
            }
        });
    }

    return (
        <>
            <span className=' text-gray-700 flex justify-center text-sm mb-5'>CATEGORY /
                <Link to={`/products/${category}`}>
                    <span className='text-brand font-bold  hover:brightness-125'>
                        {category}
                    </span>
                </Link >
            </span >
            <section className='flex flex-col md:flex-row p-4 justify-center'>
                <img className='px-4 baseis-7/12' src={image} alt={title} />
                <div className='w-full basis-5/12 flex flex-col p-4 '>
                    <h2 className='text-xl font-bold py-2'>{title}</h2>
                    <p className='text-xl font-bold py-2 border-b border-gray-400'>￦ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    <p className='text-sm py-4'>{description}</p>
                    <div className='flex items-center relative text-sm'>
                        <select
                            id='select'
                            className='p-2 my-4 flex-1 border border-zinc-300 outline-none'
                            onChange={handleSelect}
                            value={selected}
                        >
                            {options && options.map((option, index) => (
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                        {success && <p className='p-4 px-12 absolute bg-white border border-brand text-brand bottom-0 right-0'>{success}</p>}
                    </div>
                    <Button text={'장바구니 담기'} onClick={handleClick} disabled={false} />

                </div>
            </section>
        </>
    );
}

