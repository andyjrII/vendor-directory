import { PrismaClient } from '@/app/generated/prisma';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function VendorProfile({
  params,
}: {
  params: { id: string };
}) {
  const vendor = await prisma.vendor.findUnique({
    where: { id: params.id },
    include: { reviews: true },
  });

  if (!vendor) return notFound();

  return (
    <main className='max-w-3xl mx-auto p-6'>
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
        {vendor.reviews.map((review) => (
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
    </main>
  );
}
