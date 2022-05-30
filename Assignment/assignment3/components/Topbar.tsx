import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const Menus = [
    {
        href: '/market-diff',
        text: 'Market Diff'
    },
    {
        href: '/chart',
        text: 'Chart'
    },
    {
        href: '/trade',
        text: 'Trade'
    }
];

const Topbar = () => {
    const router = useRouter();
    return (
        <div className=' flex justify-between items-center px-20 py-4 bg-darkbg'>
            <div className='flex'>
                <img className='w-[54px] h-[54px] mr-4' src='/image 8-2.png' />
                <div>
                    <p className=' text-white text-lg font-bold'>FINSTABLE</p>
                    <p className=' text-textBlue'>Traning</p>
                </div>
            </div>
            <div className='flex text-white space-x-28 items-center'>
                {Menus.map((menu) => (
                    <Link key={menu.href} href={menu.href}>
                        <a
                            className={` hover:text-textBlue transition font-medium 
                            ${router.pathname === menu.href ? "text-textBlue"
                                    : ""}`}
                        >
                            {menu.text}</a>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Topbar