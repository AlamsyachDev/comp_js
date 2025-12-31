'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react' // Pastikan sudah install @iconify/react

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    // Scroll ke atas dengan halus
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    // Konfigurasi WhatsApp
    const phoneNumber = "6281234567890" // Ganti dengan nomor WA Anda (gunakan format 62)
    const message = "Halo, saya tertarik dengan jasa professional branding Anda. Bisa bantu saya?"
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <div className='fixed bottom-8 right-8 z-[9999]'>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
                
                {/* TOMBOL WHATSAPP */}
                <a
                    href={waLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] shadow-xl px-5 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95'
                >
                    <Icon icon="logos:whatsapp-icon" width={24} height={24} />
                    <span className='hidden md:block'>Hubungi Kami</span>
                </a>

                {/* TOMBOL SCROLL TO TOP */}
                {isVisible && (
                    <div
                        onClick={scrollToTop}
                        aria-label='scroll to top'
                        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#102C46] text-white shadow-lg transition duration-300 ease-in-out hover:bg-black group'
                    >
                        <span className='mt-[4px] h-3 w-3 rotate-45 border-l-2 border-t-2 border-white group-hover:border-primary'></span>
                    </div>
                )}
            </div>
        </div>
    )
}