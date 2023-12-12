'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBug } from "react-icons/io5";
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' },
    ]
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify="between">
                    <Flex align='center' gap='3'>
                        <Link href='/'><IoBug /></Link>
                        <ul className='flex space-x-6'>
                            {
                                links.map((link, index) => (
                                    <li key={index}>
                                        <Link className={classnames({
                                            'text-zinc-900': link.href === currentPath,
                                            'text-zinc-500': link.href !== currentPath,
                                            'hover:text-zinc-800 transition-colors': true
                                        })} href={link.href}>{link.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' &&
                            <Link href='/api/auth/signout'>
                                Log out
                            </Link>
                        }
                        {status === 'unauthenticated' &&
                            <Link href='/api/auth/signin'>
                                Login
                            </Link>
                        }
                    </Box>
                </Flex>
            </Container>


        </nav>
    )
}

export default NavBar