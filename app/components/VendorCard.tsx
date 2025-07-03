import Link from 'next/link';
import StarRating from './StarRating';
import { MdVerifiedUser } from 'react-icons/md';

type Vendor = {
  id: string | number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
};

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className='bg-white rounded-xl shadow-md shadow-pink-200 p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fadeInUp'>
      <div className='mb-3'>
        <h3 className='text-2xl font-semibold text-pink-800 mb-1'>
          {vendor.name}
        </h3>
        <p className='text-lg font-semibold text-gray-500'>
          {vendor.specialty}
        </p>
        <p className='text-lg text-gray-400 mb-2'>{vendor.location}</p>
        <p
          className={`flex ${
            vendor.verified ? 'text-green-500' : 'text-gray-200'
          }`}
        >
          <MdVerifiedUser className='text-lg mt-0.5 me-2' />{' '}
          {vendor.verified ? 'Verified' : 'Not Verified'}
        </p>
      </div>

      <div className='flex items-center space-x-2 text-yellow-500 text-sm mb-4'>
        <StarRating
          rating={vendor.rating}
          editable={false}
          className='text-xl'
        />
        <span className='mt-0.5'>{vendor.rating.toFixed(1)}</span>
        <span className='text-gray-400'>({vendor.totalReviews})</span>
      </div>

      <Link href={`/vendor/${vendor.id}`}>
        <button className='w-full bg-pink-600 text-white text-md py-3 rounded-md hover:bg-pink-700 hover:cursor-pointer transition'>
          View Profile
        </button>
      </Link>
    </div>
  );
}
