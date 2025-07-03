'use client';

import ReviewForm from '@/app/components/ReviewForm';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRating from '@/app/components/StarRating';

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
    <main className='max-w-3xl mx-auto p-8 bg-white rounded-md shadow-md shadow-pink-200 my-6'>
      <nav className='mb-4'>
        <Link href='/' className='text-sm text-pink-600 hover:underline'>
          ← Back to Vendor Directory
        </Link>
      </nav>

      <section className='bg-gradient-to-br from-pink-50 to-white p-6 rounded-lg shadow-md shadow-pink-200 mb-6 '>
        <h1 className='text-4xl font-bold text-gray-800 mb-1'>{vendor.name}</h1>
        <p className='text-gray-600 italic mb-2'>
          {vendor.specialty} — {vendor.location}
        </p>
        <div className='flex items-center space-x-2 text-yellow-500 text-lg'>
          <StarRating
            rating={vendor.rating}
            editable={false}
            className='text-xl'
          />
          <span>{vendor.rating.toFixed(1)}</span>
          <span className='text-gray-500 text-sm'>
            ({vendor.totalReviews} reviews)
          </span>
        </div>
      </section>

      <hr className='my-6 text-pink-400' />

      {/* ReviewForm appears here */}
      <ReviewForm vendorId={vendor.id} onSubmitted={fetchVendor} />

      <hr className='my-6 text-pink-400' />

      <h2 className='text-2xl font-semibold text-gray-800 border-b border-pink-200 pb-2 mb-4'>
        Customer Reviews
      </h2>

      {/* List of Reviews */}
      <ul className='space-y-4 mb-6'>
        {vendor.reviews.map((review: any) => (
          <li className='bg-white p-5 rounded-lg shadow-lg shadow-pink-200'>
            <p className='text-gray-700 mb-2'>{review.content}</p>
            <div className='flex items-center justify-between text-sm text-gray-500'>
              <div className='flex items-center space-x-1 text-yellow-500'>
                <span className='mt-1 me-2'>{review.rating}</span>
                <StarRating
                  rating={review.rating}
                  editable={false}
                  className='text-sm'
                />
              </div>
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
