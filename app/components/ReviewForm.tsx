'use client';

import { useState } from 'react';

export default function ReviewForm({
  vendorId,
  onSubmitted,
}: {
  vendorId: string;
  onSubmitted?: () => void;
}) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
      onSubmitted?.();
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 bg-white p-4 rounded shadow space-y-4'
    >
      <h3 className='text-lg font-semibold'>Leave a Review</h3>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Write your review...'
        className='w-full border rounded p-2'
        required
      />

      <div>
        <label className='block text-sm font-medium'>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className='border rounded p-2'
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && 's'}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        disabled={submitting}
        className='bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700'
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>

      {success && <p className='text-green-600 text-sm'>Review submitted!</p>}
    </form>
  );
}
