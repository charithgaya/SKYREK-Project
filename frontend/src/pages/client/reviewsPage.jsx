import React from 'react'

function ReviewsPage() {
    const reviews = [
        {
            name: "Nimali Pathirana",
            rating: 5,
            comment: "Amazing lipstick! 💄 Highly recommend. ☺️"
        },
        {
            name: "Kamal Liyanage",
            rating: 4,
            comment: "Good quality products.👍"
        }
    ];

  return (
    <div className='p-6 min-h-screen'>
      <h1 className='text-2xl font-bold text-center text-pink-500 mb-4'>Customer Reviews</h1>

      {reviews.map((r, i) => (
        <div key={i} className='bg-[#FFFFF0] shadow-lg p-4 mb-3 rounded-lg'>
            <h3 className='font-bold pb-2'>{r.name}</h3>
            <div className='flex justify-between'>
              <p className='font-style: italic'>{r.comment}</p>
              <p>⭐ {r.rating}</p>
            </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsPage
