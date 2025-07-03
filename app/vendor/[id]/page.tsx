'use client';

import ReviewForm from '@/app/components/ReviewForm';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRating from '@/app/components/StarRating';
import { FiMapPin } from 'react-icons/fi';
import { MdVerifiedUser } from 'react-icons/md';

export default function VendorProfile() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchVendor = async () => {
    const res = await fetch(`/api/vendors/${id}`);

    if (!res.ok) {
      setVendor(null);
      setLoading(false);
      return;
    }

    const data = await res.json();

    if (data?.error) {
      setVendor(null);
    } else {
      setVendor(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  if (loading)
    return (
      <main className='min-h-screen text-center bg-pink-600 py-20'>
        <h1 className='text-4xl text-white font-extrabold'>Loading...</h1>
      </main>
    );

  if (!vendor) {
    return (
      <main className='max-w-2xl mx-auto p-10 text-center'>
        <h2 className='text-3xl font-bold text-pink-600 mb-4'>
          Vendor Not Found
        </h2>
        <p className='text-gray-500 mb-6'>
          Oops! That vendor doesn’t exist or may have been removed.
        </p>
        <Link
          href='/'
          className='inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition'
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className='vendor-page min-h-screen p-4'>
      <div className='max-w-4xl mx-auto px-10 py-14 bg-white rounded-md shadow-sm shadow-pink-100 my-6'>
        <nav className='mb-4'>
          <Link href='/' className='text-sm text-pink-600 hover:underline'>
            ← Back to Home
          </Link>
        </nav>

        <section className='bg-gradient-to-bl from-pink-200 to-pink-600 p-8 mx-5 rounded-lg shadow-md shadow-pink-200 '>
          <h1 className='sm:text-5xl text-6xl font-bold text-white mb-2 font-serif'>
            {vendor.name}
          </h1>
          <p className='text-white font-bold mb-2'>{vendor.specialty}</p>
          <p className='text-white italic mb-2 flex'>
            <FiMapPin className='me-2 mt-0.5' /> {vendor.location}
          </p>
          <p
            className={`flex mb-2 ${
              vendor.verified ? 'text-green-500' : 'text-gray-300'
            }`}
          >
            <MdVerifiedUser className='text-lg mt-0.5 me-2' />{' '}
            {vendor.verified ? 'Verified' : 'Not Verified'}
          </p>
          <div className='flex items-center space-x-2 text-yellow-400 text-lg'>
            <StarRating
              rating={vendor.rating}
              editable={false}
              className='text-2xl'
            />
            <span className='text-xl font-semibold mt-0.5'>
              {vendor.rating.toFixed(1)}
            </span>
            <span className='text-white text-sm mt-1.5'>
              ({vendor.totalReviews} reviews)
            </span>
          </div>
        </section>

        <hr className='my-10 mx-5 text-pink-100' />

        <h2 className='text-2xl font-semibold text-pink-800 mb-4 mx-5'>
          Customer Reviews
        </h2>

        {/* List of Reviews */}
        <ul className='space-y-4 mb-6 mx-5'>
          {vendor.reviews.length > 0 ? (
            vendor.reviews.map((review: any) => (
              <li className='bg-white p-5 mb-8 rounded-lg shadow-md shadow-pink-200 hover:shadow-pink-300'>
                <span className='text-sm text-gray-400'>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <div className='flex items-center space-x-1 text-yellow-500  my-2'>
                  <StarRating
                    rating={review.rating}
                    editable={false}
                    className='text-lg'
                  />
                </div>
                <p className='text-lg text-gray-700'>{review.content}</p>
              </li>
            ))
          ) : (
            <p className='text-gray-500 p-5 my-8'>
              Be the first to add a review...
            </p>
          )}
        </ul>

        <hr className='my-10 mx-5 text-pink-100' />

        {/* ReviewForm */}
        <ReviewForm vendorId={vendor.id} onSubmitted={fetchVendor} />
      </div>
    </main>
  );
}
