'use client';

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function StarRating({
  rating,
  setRating,
  editable = false,
  className = 'text-xl',
}: {
  rating: number;
  setRating?: (value: number) => void;
  editable?: boolean;
  className?: string;
}) {
  const roundedRating = roundToHalf(rating);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= roundedRating;
    const isHalf =
      i === Math.ceil(roundedRating) && !Number.isInteger(roundedRating);

    const base = editable ? 'cursor-pointer' : 'cursor-default';

    const iconClass = `${className} transition-colors duration-200 ${
      isFilled || isHalf
        ? 'text-yellow-400'
        : 'text-gray-200 hover:text-yellow-400'
    }`;

    stars.push(
      <span
        key={i}
        onClick={() => editable && setRating?.(isHalf ? i - 0.5 : i)}
        className={base}
      >
        {isFilled ? (
          <FaStar className={iconClass} />
        ) : isHalf ? (
          <FaStarHalfAlt className={iconClass} />
        ) : (
          <FaRegStar className={iconClass} />
        )}
      </span>
    );
  }

  return <div className='flex space-x-1'>{stars}</div>;
}

// Helper Function
function roundToHalf(num: number) {
  return Math.round(num * 2) / 2;
}
