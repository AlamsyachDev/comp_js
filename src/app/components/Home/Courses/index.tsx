'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { CourseDetailType } from '@/app/types/coursedetail'
import withBasePath from '@/utils/basePath'
import CourseDetailSkeleton from '../../Skeleton/CourseDetail'
import Link from 'next/link'

// Interface diperbarui sesuai dengan kategori baru
interface Name {
    imageSrc: string
    course: string
    price: string
    profession: string
    category:
    | 'professionalgrooming'
    | 'publicspeaking'
    | 'personalbranding'
    | 'masterofceremony'
}

const NamesList = () => {
    const [courseDetail, setCourseDetail] = useState<CourseDetailType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(withBasePath('/data/data.json'))
                if (!res.ok) throw new Error('Failed to fetch.')
                const data = await res.json()
                setCourseDetail(data.CourseDetailData)
            } catch (error) {
                console.error('Error fetching services:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Default filter diset ke 'professionalgrooming'
    const [selectedButton, setSelectedButton] = useState<
        | 'professionalgrooming'
        | 'publicspeaking'
        | 'personalbranding'
        | 'masterofceremony'
        | 'all'
        | null
    >('professionalgrooming')

    // Filter Logic
    const grooming = courseDetail.filter((name) => name.category === 'professionalgrooming')
    const speaking = courseDetail.filter((name) => name.category === 'publicspeaking')
    const branding = courseDetail.filter((name) => name.category === 'personalbranding')
    const mc = courseDetail.filter((name) => name.category === 'masterofceremony')

    let selectedNames: Name[] = []
    if (selectedButton === 'professionalgrooming') selectedNames = grooming
    else if (selectedButton === 'publicspeaking') selectedNames = speaking
    else if (selectedButton === 'personalbranding') selectedNames = branding
    else if (selectedButton === 'masterofceremony') selectedNames = mc

    const nameElements = selectedNames.map((name, index) => (
        <div id='Courses' key={index} className='shadow-lg rounded-xl group flex bg-white overflow-hidden'>
            <div className='py-5 lg:py-0 flex flex-col w-full'>
                <div className='overflow-hidden bg-gray-100 aspect-video'>
                    <Image
                        src={withBasePath(name.imageSrc)}
                        alt={name.course}
                        width={700}
                        height={700}
                        className='h-full w-full object-cover group-hover:scale-110 transition duration-500'
                    />
                </div>
                <div className='p-5 flex flex-col justify-between gap-4 flex-1'>
                    <div className="flex flex-col gap-2">
                        <div className='flex items-center justify-between'>
                            <p className='text-sm font-semibold text-blue-600 uppercase tracking-wider'>{name.course}</p>
                            <div className='text-lg font-bold text-gray-900'>
                                <p>${name.price}</p>
                            </div>
                        </div>
                        <Link href={'/'}>
                            <p className='text-xl font-bold group-hover:text-primary transition-colors'>
                                {name.profession}
                            </p>
                        </Link>
                    </div>
                    <div className='flex justify-between items-center border-t pt-4 mt-2'>
                        <div className='flex items-center'>
                            <Icon icon="solar:users-group-rounded-linear" className="text-gray-400 mr-1" width={20} />
                            <p className='text-sm text-gray-500'>Sesi Privat</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon icon="solar:star-bold" className="text-yellow-400 mr-1" width={18} />
                            <p className='text-sm font-medium'>4.9</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <section id='courses-section' className="py-16 bg-gray-50">
            <div className='container mx-auto max-w-7xl px-4'>
                <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-10'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Layanan Unggulan</h2>
                    <button className='bg-primary hover:bg-black text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md'>
                        Lihat Semua Jadwal
                    </button>
                </div>

                {/* FILTER TABS */}
                <div className='flex items-center space-x-2 md:space-x-8 border-b border-gray-200 mb-10 overflow-x-auto pb-2'>
                    {[
                        { id: 'professionalgrooming', label: 'Grooming', icon: 'solar:user-speak-rounded-linear' },
                        { id: 'publicspeaking', label: 'Public Speaking', icon: 'solar:microphone-2-linear' },
                        { id: 'personalbranding', label: 'Branding', icon: 'solar:medal-ribbon-linear' },
                        { id: 'masterofceremony', label: 'MC Service', icon: 'solar:music-notes-linear' }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setSelectedButton(btn.id as any)}
                            className={`flex items-center gap-2 pb-4 text-sm md:text-lg font-medium transition-all whitespace-nowrap ${
                                selectedButton === btn.id 
                                ? 'text-primary border-b-2 border-primary' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <Icon icon={btn.icon} width={24} className="hidden md:block" />
                            {btn.label}
                        </button>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => <CourseDetailSkeleton key={i} />)
                    ) : nameElements.length > 0 ? (
                        nameElements
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500 italic">Belum ada layanan tersedia untuk kategori ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default NamesList