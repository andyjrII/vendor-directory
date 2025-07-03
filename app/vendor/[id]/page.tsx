'use client';

import ReviewForm from '@/app/components/ReviewForm';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VendorProfile() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchVendor = async () => {
    const res = await fetch(`/api/vendors/${id}`);
    const data = await res.json();
    setVendor(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  if (loading || !vendor) return <p className='p-6'>Loading...</p>;

  return (
    <main className='max-w-3xl mx-auto p-6'>
      <Link
        href='/'
        className='text-sm text-pink-600 hover:underline mb-4 inline-block'
      >
        ← Back to Vendor Directory
      </Link>

      <h1 className='text-3xl font-bold mb-2'>{vendor.name}</h1>
      <p className='text-gray-600'>
        {vendor.specialty} — {vendor.location}
      </p>
      <p className='text-yellow-500'>
        ⭐ {vendor.rating.toFixed(1)} ({vendor.totalReviews} reviews)
      </p>

      <hr className='my-6' />

      <h2 className='text-xl font-semibold mb-2'>Reviews</h2>
      <ul className='space-y-4'>
        {vendor.reviews.map((review: any) => (
          <li key={review.id} className='bg-white p-4 rounded shadow'>
            <p className='text-sm text-gray-700'>{review.content}</p>
            <p className='text-yellow-500 text-sm'>⭐ {review.rating}</p>
            <p className='text-xs text-gray-400'>
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Review Form */}
      <ReviewForm vendorId={vendor.id} onSubmitted={fetchVendor} />
    </main>
  );
}
