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
        <div className=' flex justify-between items-center px-8 sm:px-20 py-4 bg-darkbg relative z-50 w-full'>
            <div className='flex sm:flex'>
                <img className='w-8 h-8 sm:w-[54px] sm:h-[54px] sm:mr-4 mr-2' src='/image 8-2.png' />
                <div>
                    <p className=' text-white text-sm sm:text-xl font-bold'>FINSTABLE</p>
                    <p className=' text-textBlue text-xs sm:text-lg'>Traning</p>
                </div>
            </div>
            <div className=' text-white space-x-28 items-center lg:flex hidden'>
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
            
            <div className="flex lg:hidden">
                <div className="space-y-1.5">
                    <span className="block w-6 h-0.5 bg-white animate-none"></span>
                    <span className="block w-6 h-0.5 bg-white animate-none"></span>
                    <span className="block w-6 h-0.5 bg-white animate-none"></span>
                </div>
            </div>

        </div>
    )
}

export default Topbar