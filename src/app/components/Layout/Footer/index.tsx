'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'
import { FooterLinkType } from '@/app/types/footerlinks'
import withBasePath from '@/utils/basePath'

const Footer = () => {
    const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(withBasePath('/data/data.json'))
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                SetFooterlink(data.FooterLinkData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='bg-primary' id='first-section'>
            <div className='container pt-20 pb-10'> {/* Padding dikurangi dari pt-60 agar tidak terlalu jauh */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 xl:gap-8'>
                    <div className='col-span-4 flex flex-col gap-5'>
                        <div>
                            <Image
                                src={withBasePath('/images/logo/logo2.svg')}
                                alt='Logo'
                                width={48}
                                height={64}
                            />
                        </div>
                        <p className='text-white text-lg font-medium leading-7'>
                            Tingkatkan rasa percaya diri dan personal branding Anda. 
                            Jadilah versi terbaik diri Anda bersama mentor profesional.
                        </p>
                        <div className='flex gap-4'>
                            <Link
                                href='https://instagram.com/'
                                target='_blank'
                                className='bg-white/20 rounded-full p-2 text-white hover:bg-white hover:text-primary duration-300'>
                                <Icon
                                    icon='tabler:brand-instagram'
                                    className='text-2xl inline-block'
                                />
                            </Link>
                            <Link
                                href='https://tiktok.com/'
                                target='_blank'
                                className='bg-white/20 rounded-full p-2 text-white hover:bg-white hover:text-primary duration-300'>
                                <Icon
                                    icon='tabler:brand-tiktok'
                                    className='text-2xl inline-block'
                                />
                            </Link>
                            <Link
                                href='https://youtube.com/'
                                target='_blank'
                                className='bg-white/20 rounded-full p-2 text-white hover:bg-white hover:text-primary duration-300'>
                                <Icon
                                    icon='tabler:brand-youtube-filled'
                                    className='text-2xl inline-block'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* COLUMN-2/3 */}
                    <div className='col-span-4'>
                        <div className='flex gap-20'>
                            {footerlink.map((product, i) => (
                                <div key={i} className='group relative col-span-2'>
                                    <p className='text-white text-xl font-semibold mb-9'>
                                        {product.section}
                                    </p>
                                    <ul>
                                        {product.links.map((item, i) => (
                                            <li key={i} className='mb-3'>
                                                <Link
                                                    href={item.href}
                                                    scroll={item.href !== "/"}
                                                    className='text-white/60 hover:text-white text-sm font-normal mb-6'>
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN-4 */}
                    <div className='col-span-4'>
                        <h3 className='text-white text-xl font-semibold mb-6'>
                            Dapatkan Tips Branding
                        </h3>
                        <p className='text-white/60 text-sm mb-4'>Langganan newsletter kami untuk tips grooming & public speaking mingguan.</p>
                        <div className='relative text-white focus-within:text-white flex flex-row-reverse w-full'>
                            <input
                                type='email'
                                name='q'
                                className='py-4 text-sm w-full text-white bg-white/15 rounded-md pl-4 focus:outline-none bg-emailbg focus:ring-1 focus:ring-white'
                                placeholder='Masukkan alamat email'
                                autoComplete='off'
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                <button
                                    type='submit'
                                    className='p-1 hover:scale-110 transition-transform'>
                                    <Icon
                                        icon='tabler:send'
                                        className='text-white text-2xl inline-block me-2'
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* COPYRIGHT SECTION */}
            <div className='py-6 border-t border-white/10'>
                <h3 className='text-center text-white/60 text-sm'>
                    &copy; {new Date().getFullYear()} - Professional Grooming & MC. All Rights Reserved. 
                    <br className="sm:hidden" /> Made with Passion for Your Success.
                </h3>
            </div>
        </div>
    )
}

export default Footer