'use client';

import { useEffect, useState } from 'react';
import VendorCard from './components/VendorCard';
import HeroSection from './components/HeroSection';

type Vendor = {
  id: string | number;
  location: string;
  verified: boolean;
  name: string;
  specialty: string;
  rating: number;
  totalReviews: number;
};

export default function HomePage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyVerified, setOnlyVerified] = useState(false);

  useEffect(() => {
    async function fetchVendors() {
      const res = await fetch('/api/vendors');
      const data = await res.json();
      setVendors(data);
    }
    fetchVendors();
  }, []);

  return (
    <main className='min-h-screen bg-pink-50 text-gray-800'>
      {/* Hero Section */}
      <HeroSection />

      {/* Filters */}
      <div className='max-w-4xl mx-auto p-6 my-6 flex flex-col md:flex-row md:items-center gap-4 bg-pink-500 rounded-xl'>
        <input
          type='text'
          placeholder='Search by location...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-4 py-2 rounded border-pink-300 shadow shadow-pink-300 w-full md:w-2/3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400'
        />
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            checked={onlyVerified}
            onChange={() => setOnlyVerified((prev) => !prev)}
          />
          <span className='text-white font-semibold'>
            Only show verified vendors
          </span>
        </label>
      </div>

      {/* Vendor Grid */}

      <section className='max-w-7xl mx-auto mb-6 p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 transition-all duration-900'>
        {vendors
          .filter((v) =>
            v.location.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((v) => (onlyVerified ? v.verified : true))
          .map((vendor: any) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
      </section>
    </main>
  );
}
