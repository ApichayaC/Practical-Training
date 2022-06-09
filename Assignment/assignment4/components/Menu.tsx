import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const Menus = [
    {
        href: '/',
        text: 'Wallet'
    },
    {
        href: '/transfer',
        text: 'Transfer'
    },
    
];
const Menu = () => {
    const router = useRouter()
  return (
    <div>
         <div className='flex items-center justify-end text-white mx-40 mt-4  '>
                    {Menus.map((menu) => (
                    <Link key={menu.href} href={menu.href}>
                        <a
                            className={` hover:text-blue-300 transition mx-2 bg-blue-800 rounded-t-lg px-5 py-1 shadow-blue-500 shadow-sm
                            ${router.pathname === menu.href ? "text-blue-500"
                                    : ""}`}
                        >
                            {menu.text}</a>
                    </Link>
                ))}
            </div>
    </div>
  )
}

export default Menu