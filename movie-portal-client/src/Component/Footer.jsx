import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">MOVIE PORTAL</h2>
            <p className="text-gray-400">Your ultimate destination for movies, TV shows, and animations. Stay tuned for the latest releases and enjoy a world of entertainment.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/mdraselsharm" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.509V14.706h-3.1v-3.623h3.1V8.413c0-3.066 1.863-4.731 4.612-4.731 1.312 0 2.437.097 2.765.141v3.208h-1.897c-1.491 0-1.78.709-1.78 1.749v2.293h3.561l-.465 3.623h-3.096V24h6.073C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" /></svg>
              </a>
              <a href="https://x.com/mdrasel_shar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.371-1.732.621-2.675.733a4.677 4.677 0 0 0 2.05-2.576 9.221 9.221 0 0 1-2.958 1.131 4.6 4.6 0 0 0-7.843 4.197A13.122 13.122 0 0 1 1.671 3.149a4.573 4.573 0 0 0 1.417 6.104A4.56 4.56 0 0 1 .964 8.88v.058a4.6 4.6 0 0 0 3.684 4.508 4.567 4.567 0 0 1-2.073.079 4.614 4.614 0 0 0 4.294 3.186 9.256 9.256 0 0 1-5.741 1.98A9.344 9.344 0 0 1 0 19.54a13.024 13.024 0 0 0 7.077 2.056c8.49 0 13.131-7.028 13.131-13.131 0-.2-.004-.402-.013-.601A9.351 9.351 0 0 0 24 4.59a9.26 9.26 0 0 1-2.357.646z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.637 1.338 1.004 1.004 1.276 2.271 1.338 3.637.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.338 3.637-1.004 1.004-2.271 1.276-3.637 1.338-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.637-1.338-1.004-1.004-1.276-2.271-1.338-3.637-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.338-3.637 1.004-1.004 2.271-1.276 3.637-1.338 1.266-.058 1.646-.07 4.85-.07m0-2.163C8.72 0 8.267.01 7.053.072c-1.21.062-2.466.334-3.633 1.5C2.253 2.738 1.982 3.994 1.92 5.205.86 8.52.86 15.48 1.92 18.795c.062 1.21.333 2.466 1.5 3.633 1.167 1.167 2.423 1.438 3.633 1.5 1.213.062 1.666.072 4.881.072s3.668-.01 4.881-.072c1.21-.062 2.466-.333 3.633-1.5 1.167-1.167 1.438-2.423 1.5-3.633.062-1.213.072-1.666.072-4.881s-.01-3.668-.072-4.881c-.062-1.21-.333-2.466-1.5-3.633-1.167-1.167-2.423-1.438-3.633-1.5-1.213-.062-1.666-.072-4.881-.072zM12 5.838a6.162 6.162 0 0 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z" /></svg>
              </a>
              <a href="https://github.com/raselworshop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaGithub className='text-2xl'></FaGithub>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
              <li className="mb-2"><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="hover:text-gray-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © 2024 MOVIE PORTAL. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
