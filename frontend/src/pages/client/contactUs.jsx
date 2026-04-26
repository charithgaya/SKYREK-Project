import { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";

function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent!");

    setForm({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <div className='min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-50'>
      <div className='bg-[#FAF9F6] shadow-lg rounded-2xl p-8 w-full max-w-[500px]'>

        <h1 className='text-3xl font-bold text-center mb-6 text-pink-500'>
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input 
              type='text'
              name='name'
              placeholder='Your Name'
              onChange={handleChange}
              required
              className='border border-pink-400 p-2 rounded-lg'
            />

            <input
              type='email'
              name='email'
              placeholder='Your Email'
              onChange={handleChange}
              required
              className='border border-pink-400 p-2 rounded-lg'
            />

            <textarea
              name='message'
              placeholder='Your Message'
              onChange={handleChange}
              required
              className='border border-pink-400 p-2 rounded-lg'
            />

            <button
              className='bg-pink-500 font-semibold hover:font-bold hover:scale-102 border-none p-2 rounded-lg text-white cursor-pointer'
            >
              Send Message<IoIosSend className='inline-block ml-2 text-lg'/>
            </button>
        </form>

        <div className='text-center font-semibold text-pink-500 mt-6 text-md'>
          <p><MdAlternateEmail className='inline-block mr-2 text-pink-500 text-lg'/>Email :  support@glowcare.com</p>
          <p><MdLocalPhone className='inline-block mr-2 text-pink-500 text-lg'/>Phone :  +94 74 123 4567</p>
          <p><FaWhatsapp className='inline-block mr-2 text-green-500 text-lg'/>+94 74 123 4567 </p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
