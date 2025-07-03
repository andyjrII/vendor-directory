'use client';

import { useEffect, useState } from 'react';
import VendorCard from './components/VendorCard';

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
      <section className='bg-pink-100 text-center py-12 px-4'>
        <h1 className='text-4xl md:text-5xl font-serif text-pink-700 mb-4'>
          Discover Trusted Beauty Vendors 💇🏽‍♀️
        </h1>
        <p className='text-lg max-w-xl mx-auto text-gray-600'>
          Explore premium hair extensions, makeup, and beauty products from
          verified vendors across Nigeria.
        </p>
      </section>

      {/* Filters */}
      <div className='max-w-6xl mx-auto p-4 flex flex-col md:flex-row md:items-center gap-4'>
        <input
          type='text'
          placeholder='Search by location...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-4 py-2 rounded border border-gray-300 w-full md:w-1/2'
        />
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            checked={onlyVerified}
            onChange={() => setOnlyVerified((prev) => !prev)}
          />
          <span>Only show verified vendors</span>
        </label>
      </div>

      {/* Vendor Grid */}
      <section className='max-w-6xl mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
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
