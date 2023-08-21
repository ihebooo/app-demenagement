import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are dedicated to providing high-quality moving services to help you relocate smoothly.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Main Street</p>
            <p className="text-gray-400">City, State ZIP</p>
            <p className="text-gray-400">info@example.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
