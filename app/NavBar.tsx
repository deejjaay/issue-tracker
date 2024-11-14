'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiMiniBugAnt } from "react-icons/hi2";
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'},
    ]
    return (
        <nav className='flex space-x-5 mb-5 px-5 h-14 border-b items-center'>
            <Link href='/'><HiMiniBugAnt /></Link>
            <ul className='flex space-x-2'>
                {links.map(link => <Link key={link.href}
                    className={classNames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                        })
                    } href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar 