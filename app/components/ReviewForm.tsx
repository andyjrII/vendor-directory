'use client';

import { useState } from 'react';
import StarRating from './StarRating';

export default function ReviewForm({
  vendorId,
  onSubmitted,
}: {
  vendorId: string;
  onSubmitted?: () => void;
}) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = rating > 0 && content.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ vendorId, content, rating }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setContent('');
      setRating(5);
      setShowPopup(true);
      onSubmitted?.();
      setTimeout(() => setShowPopup(false), 3000);
    }

    setSubmitting(false);
  };

  return (
    <div className='relative'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-pink-300 rounded-lg shadow-lg p-8 space-y-4 max-w-3xl mx-auto'
      >
        <h3 className='text-2xl font-semibold text-pink-800'>Leave a Review</h3>

        <div className='mb-8'>
          <label className='block text-sm font-medium text-pink-600 mb-4'>
            Your Rating
          </label>
          <StarRating
            rating={rating}
            setRating={setRating}
            editable
            className='text-6xl'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-pink-600 mb-4'>
            Your Feedback
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Care to share more about it?'
            className='w-full border border-pink-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400'
            rows={4}
            required
          />
        </div>

        <button
          type='submit'
          disabled={!isFormValid || submitting}
          className={`${
            !isFormValid
              ? 'bg-pink-300 cursor-not-allowed'
              : 'bg-pink-600 hover:bg-pink-700 cursor-pointer'
          } text-white px-6 py-2 rounded-md transition`}
        >
          {submitting ? 'Submitting...' : 'Publish Feedback'}
        </button>
      </form>

      {/* Thank You Popup */}
      {showPopup && (
        <div className='absolute top-0 left-1/2 -translate-x-1/2 mt-4 bg-green-600 text-white text-xl px-6 py-3 rounded shadow-lg z-50 animate-fadeInOut'>
          🎉 Thank you! Your review helps others discover trusted vendors.
        </div>
      )}
    </div>
  );
}
