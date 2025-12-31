import Link from 'next/link'
import Dropdownone from './Dropdownone'
import Dropdowntwo from './Dropdowntwo'
import Image from 'next/image'
import withBasePath from '@/utils/basePath'

const Banner = () => {
    return (
        <section id='Home' className='bg-banner-image pt-28 pb-20'>
            <div className='relative px-6 lg:px-8'>
                <div className='container'>
                    <div className='flex flex-col gap-4 text-center'>
                        {/* Judul Utama yang mencakup semua aspek jasa */}
                        <h1 className='leading-tight font-bold tracking-tight max-w-4xl mx-auto text-4xl md:text-6xl'>
                            Master Your Presence, Elevate Your Personal Brand
                        </h1>
                        {/* Penjelasan singkat tentang Grooming, Speaking, dan MC */}
                        <p className='text-lg leading-8 text-black max-w-2xl mx-auto'>
                            Transformasi penampilan, kuasai panggung, dan bangun citra profesional bersama mentor berpengalaman untuk karier yang berdampak.
                        </p>
                        
                        {/* Badge Rating & Trusted Client */}
                        <div className='backdrop-blur-md bg-white/30 border border-white/30 rounded-lg shadow-lg p-6 w-fit mx-auto'>
                            <div className='flex items-center justify-center gap-8'>
                                <div className='hidden sm:block -space-x-2 overflow-hidden'>
                                    {/* Avatar melambangkan klien/peserta workshop */}
                                    {[1, 2, 3, 4, 5].map((idx) => (
                                        <Image
                                            key={idx}
                                            className='inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover'
                                            src={`https://i.pravatar.cc/150?u=${idx}`}
                                            alt={`client-${idx}`}
                                            width={48}
                                            height={48}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className='flex justify-center sm:justify-start items-center'>
                                        <h3 className='text-2xl font-semibold mr-2'>4.9</h3>
                                        <Image
                                            src={withBasePath('/images/banner/Stars.svg')}
                                            alt='stars-icon'
                                            width={100}
                                            height={20}
                                            className='w-[100px]'
                                        />
                                    </div>
                                    <div>
                                        <h3 className='text-sm font-medium'>Trusted by 500+ Professionals</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FILTER / DROPDOWN SELECTION */}
                    <div className='mx-auto max-w-4xl mt-12 p-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg shadow-xl'>
                        <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8 items-center'>
                            {/* Dropdown 1: Biasanya berisi kategori Jasa (Grooming/MC/Speaking) */}
                            <div className='col-span-3'>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Pilih Layanan</p>
                                <Dropdownone />
                            </div>
                            {/* Dropdown 2: Biasanya berisi tipe sesi (Privat/Workshop/Event) */}
                            <div className='col-span-3'>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Tipe Sesi</p>
                                <Dropdowntwo />
                            </div>
                            <div className='col-span-3 sm:col-span-2'>
                                <Link href={'/#booking-section'}>
                                    <button className='bg-primary w-full hover:bg-black hover:text-white duration-300 border border-primary text-white font-bold py-4 px-3 rounded-md hover:cursor-pointer transition-all shadow-md'>
                                        Cek Jadwal
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner