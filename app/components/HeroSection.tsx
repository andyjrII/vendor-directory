'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = ['/hero1.jpg', '/hero2.png', '/hero3.jpg'];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative h-[80vh] w-full overflow-hidden'>
      {/* Background Carousel */}
      <div className='absolute inset-0 z-0 transition-opacity duration-1000'>
        <Image
          src={images[index]}
          alt='Hero background'
          fill
          className='object-cover brightness-75 transition-opacity duration-1000'
        />
      </div>

      {/* Overlay Content */}
      <div className='relative z-10 h-full flex flex-col justify-center items-center text-center px-6'>
        {/* Slanted Banner */}
        <div className='bg-pink-600 px-6 py-3 transform -skew-y-3 animate-wobble rounded-2xl text-white'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight transform -skew-y-3 animate-wobble text-white'>
            Discover Trusted Beauty Vendors
          </h1>
        </div>

        <h4 className='mt-6 text-xl md:text-2xl max-w-2xl animate-fadeIn text-pink-400 font-black'>
          Explore Top-rated Stylists, Makeup Artists & Beauty Pros near you.
        </h4>

        <button className='mt-8 bg-white text-pink-600 font-semibold px-6 py-3 rounded-md hover:bg-pink-100 transition animate-fadeIn delay-300'>
          Browse Vendors
        </button>
      </div>
    </section>
  );
}
