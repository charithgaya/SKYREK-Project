import React from 'react'

function AboutUs() {
  return (
    <div className='w-full min-h-screen text-gray-800'>
      <div className='w-full bg-gradient-to-r from-pink-200 via-pink-100 to-pink-50 py-16 text-center'>

        
          <h1 className='text-3xl font-bold mb-4 text-pink-500'>About GlowCare</h1>
          <p className='text-lg lg:text-xl max-w-[600px] mx-auto'>
            We bring you high-quality beauty & skincare products to help you feel confident every day.
          </p>
       

        <div className='mx-auto max-w-[1000px] py-12 px-6 text-center'>
          <h2 className='text-2xl font-semibold mb-4 text-pink-500'>Our Mission</h2>
          <p className='text-gray-800 text-lg lg:text-xl'>Our mission is to make beauty accessible to everyone with affordable, authentic,
            & high-quality products.
          </p>
        </div>

        <div className='mx-auto max-w-[1000px] py-12 px-6'>
          <h2 className='text-2xl text-center font-semibold mb-8 text-pink-500'>Why Choose Us</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-[#FAF9F6] p-6 rounded-2xl shadow hover:shadow-lg transition'>
              <h3 className='font-semibold text-lg mb-2'>💯 Original Products</h3>
              <p className='text-gray-600'>We gurantee 100% authentic beauty products.</p>
            </div>

            <div className='bg-[#FAF9F6] p-6 rounded-2xl shadow hover:shadow-lg transition'>
              <h3 className='font-semibold text-lg mb-2'>💵 Affordable Prices</h3>
              <p className='text-gray-600'>Get premium products at budget-friendly prices.</p>
            </div>

            <div className='bg-[#FAF9F6] p-6 rounded-2xl shadow hover:shadow-lg transition'>
              <h3 className='font-semibold text-lg mb-2'>🚚 Fast Delivery</h3>
              <p className='text-gray-600'>Quick & reliable delivery to your doorstep.</p>
            </div>
          </div>
        </div>

        <div className='bg-[#FAF9F6] shadow-sm py-12'>
          <div className='mx-auto max-w-[900px] grid grid-cols-2 md:grid-cols-4 text-center gap-6'>

            <div>
              <h3 className='text-2xl font-bold text-pink-500'>500+</h3>
              <p className='text-gray-600 font-semibold'>Products</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-pink-500'>1000+</h3>
              <p className='text-gray-600 font-semibold'>Customers</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-pink-500'>4.8⭐</h3>
              <p className='text-gray-600 font-semibold'>Customer Ratings</p>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-pink-500'>24/7</h3>
              <p className='text-gray-600 font-semibold'>Support</p>
            </div>

          </div>
        </div>

        <div className='py-16 text-center'>
          <h2 className='text-2xl font-semibold mb-4 text-pink-500'>
            Have Question?
          </h2>
          <p className='text-gray-600 mb-6 text-lg'>Our team is here to help you anytime.</p>

          <button className='bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition'>
            Contact Us
          </button>
        </div>

      </div>
    </div>
  )
}

export default AboutUs
