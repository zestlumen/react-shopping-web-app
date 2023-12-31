import React from 'react';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCarts from '../hooks/useCarts';
// import { getCart } from '../api/firebase';
// import { useQuery } from '@tanstack/react-query';
// import { useAuthContext } from '../context/AuthContext';

const SHIPPING = 3000;
export default function MyCart() {
    const {
        cartQuery: { isLoading, data: products }
    } = useCarts();

    // const { uid } = useAuthContext();
    // const { isLoading, data: products } = useQuery(['carts'], () => { getCart(uid) });

    if (isLoading) return <p>Loading...</p>;

    const hasProducts = products && products.length > 0;
    const totalPrice = products &&
        products.reduce((prev, current) =>
            prev + parseInt(current.price) * current.quantity, 0
        );

    return (
        <section className='p-8 flex flex-col'>
            <p className='text-xl text-center font-semibold pb-12 border-b border-gray-300'>SHOPPING BAG</p>
            {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
            {hasProducts && (
                <>
                    <ul className='border-b border-gray-300 mb-8 p-8'>
                        {products &&
                            products.map((product) => (
                                <CartItem key={product.id} product={product} />
                                // <CartItem key={product.id} product={product} uid={uid} />
                            ))}
                    </ul>
                    <div className='flex justify-between items-center px-2 md:px-8 lg:px-16 m-6 mb-12' >
                        <PriceCard text="총 주문금액" price={totalPrice} />
                        <BsFillPlusCircleFill className='shrink-0' />
                        <PriceCard text="총 배송비" price={SHIPPING} />
                        <FaEquals className='shrink-0' />
                        <PriceCard text="총 결제금액" price={(totalPrice + SHIPPING)} />
                    </div>
                    <Button text='주문하기' />
                </>
            )}
        </section>
    );
}

