import React, { useState } from 'react';
// import { database } from './firebaseConfig'; // Import Firebase database
import { database } from '../../../firebaseConfig';
import { ref, set } from 'firebase/database'; // Import Firebase methods for database

function Contact() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading

  // Function to handle form submission and send data to Firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted

    // Generate a unique key based on timestamp for each entry
    const emailRef = ref(database, 'queries/' + Date.now());

    // Send email data to Firebase
    set(emailRef, { email })
      .then(() => {
        setLoading(false); // Set loading state to false after submission
        setEmail(''); // Clear the input field after submission
      })
      .catch((error) => {
        setLoading(false); // Set loading state to false if there is an error
        console.error('Error submitting query:', error.message);
      });
  };

  return (
    <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-700 py-10 my-10 mx-4 sm:mx-10 md:mx-24 lg:ml-36 rounded-2xl flex flex-col items-center font-semibold text-xl text-white'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Please let us know how we can help</h1>
      <div className='mt-10 sm:mt-16 md:mt-20 backdrop-blur-lg bg-white/10 cursor-pointer hover:shadow-lg shadow-black rounded-2xl flex flex-col justify-center items-center px-8 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10'>
        <h1 className='text-sm sm:text-base md:text-lg'>sarah59275@gmail.com</h1>
        <h1 className='text-sm sm:text-base md:text-lg'>Joey@2710</h1>
        <h1 className='text-sm sm:text-base md:text-lg'>+1 9782951913</h1>
      </div>

      {/* Email Query Form */}
      <form onSubmit={handleSubmit} className='mt-10 flex flex-col items-center w-full sm:w-auto'>
        <label className='text-lg mb-4' htmlFor='email'>For Any Query:</label>

        {/* Flexbox container for input and button */}
        <div className='flex flex-col sm:flex-row items-center w-full sm:w-auto px-5'>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter your email'
            className='text-black px-4 py-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-72 border rounded-lg border-gray-400'
          />
          <button
            type='submit'
            disabled={loading} // Disable the button while loading
            className={`${
              loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold rounded-lg px-6 py-2 w-full sm:w-auto border ${
              loading ? 'border-gray-400' : 'border-green-500'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
