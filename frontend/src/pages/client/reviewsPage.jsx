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
    <div className='py-16 min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-pink-50'>
      <h1 className='text-3xl font-bold text-center text-pink-500 mb-4'>Customer Reviews</h1>
      <div className='p-4'>

        {reviews.map((r, i) => (
        <div key={i} className='bg-[#FAF9F6] shadow-lg p-4 mb-4 rounded-xl max-w-[500px] h-25 mx-auto hover:scale-102'>
            <div className='flex justify-between'>
              <h3 className='font-bold pb-2'>{r.name}</h3>
              <p>⭐ {r.rating}</p>
            </div>
              <p className='text-sm md:text-base font-style: italic'>{r.comment}</p>
        </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage
