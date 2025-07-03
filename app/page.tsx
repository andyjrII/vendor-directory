'use client';

import { useEffect, useState } from 'react';
import VendorCard from './components/VendorCard';

export default function HomePage() {
  const [vendors, setVendors] = useState([]);

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

      {/* Vendor Grid */}
      <section className='max-w-6xl mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {vendors.map((vendor: any) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </section>
    </main>
  );
}
