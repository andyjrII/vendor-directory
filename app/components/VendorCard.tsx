import Link from 'next/link';

type Vendor = {
  id: string | number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  totalReviews: number;
};

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition'>
      <h3 className='text-xl font-semibold'>{vendor.name}</h3>
      <p className='text-sm text-gray-500'>{vendor.specialty}</p>
      <p className='text-sm'>{vendor.location}</p>
      <p className='text-yellow-500'>
        ⭐ {vendor.rating.toFixed(1)} ({vendor.totalReviews})
      </p>
      <Link href={`/vendor/${vendor.id}`}>
        <button className='mt-2 text-sm text-pink-600 hover:underline hover:cursor-pointer'>
          View Profile
        </button>
      </Link>
    </div>
  );
}
