import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="bg-gradient-to- from-black via-white to-white text-white py-16 md:py-24 my-8  rounded-4xl border-2 border-black ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          {/* Headline */}
          <h1 className="text-3xl text-black sm:text-5xl font-extrabold leading-tight mb-4">
            Upgrade Your Tech Game
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg mb-6 max-w-md mx-auto md:mx-0 text-black">
            Explore the latest smartphones, laptops, and accessories at unbeatable prices. Innovate your life today!
          </p>

          {/* Call-to-Action Button */}
          {/* <Link
            to="/products"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Browse Now
          </Link> */}
        </div>

        {/* Image Placeholder */}
        <div className="md:w-1/2">
          <div className="relative">
            {/* Placeholder for electronics image */}
            <div className="w-full h-64 sm:h-80 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300">
              <span className="text-lg">Latest Smartphone & Laptop</span>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-black rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
