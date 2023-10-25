import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';
import User from './User';
import { FaPenToSquare } from 'react-icons/fa6';
import { ImHeart } from 'react-icons/im';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Button from './ui/Button';

const CATEGORY = ['ALL', 'TABLE', 'LAMP', 'CHAIR', 'SOFA', 'ETC'];

export default function Navbar() {
    const { user, login, logout } = useAuthContext();;
    return (
        <>
            <header className='flex flex-col border-gray-300 p-2 mx-3 my-5 '>
                <div className='flex justify-between border-gray-300 pb-5'>
                    <Link to='/' className='flex items-center text-4xl font-extrabold text-brand'>
                        <h1 >CHAE's Vibe</h1>
                    </Link>
                    <nav className='flex items-center gap-4 font-semibold'>
                        {user && (<Link to='/mylike' className='flex items-center'>
                            <ImHeart className='text-sm mr-0.5' />
                            <span className='hidden md:block text-[8px]'>MY LIKE</span>
                        </Link>
                        )}
                        {user && (
                            <Link to='/carts'>
                                <CartStatus />
                            </Link>
                        )}
                        {user && user.isAdmin && (
                            <Link to='/products/new' className='flex items-center  text-brand'>
                                <FaPenToSquare className='text-sm mr-0.5' />
                                <span className='hidden md:block text-[8px]'>REGISTER PRODUCT</span>
                            </Link>
                        )}
                        {user && <User user={user} />}
                        <button className='flex items-center' onClick={!user ? login : logout} >
                            {!user ?
                                (<><FiLogIn className='text-sm mr-0.5' /><span className='hidden md:block text-[8px] '>Login</span></>)
                                : (<><FiLogOut className='text-sm mr-0.5' /><span className='hidden md:block text-[8px] '>Logout</span></>)
                            }
                        </button>
                    </nav>
                </div>
                <nav className='flex gap-5 pb-3 pl-1.5'>
                    {CATEGORY.map((cate, index) => <li key={index} className='hover:text-brand'><Link to='/products' className='text-sm font-bold '>{cate}</Link></li>)}
                    {/* // <Link to='/products' className='text-sm font-bold'>ALL</Link>
                    // <Link to='/products' className='text-sm font-bold'>TABLE</Link>
                    // <Link to='/products' className='text-sm font-bold'>LAMP</Link>
                    // <Link to='/products' className='text-sm font-bold'>CHAIR</Link>
                    // <Link to='/products' className='text-sm font-bold'>SOFA</Link>
                    // <Link to='/products' className='text-sm font-bold'>ETC</Link> */}
                </nav>
            </header >
        </>
    );
}
