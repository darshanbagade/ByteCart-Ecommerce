import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="container mx-auto bg-gradient-to- from-black via-white to-white text-white py-8 md:py-16 lg:py-16 lg:my-8 mg:my-8  rounded-4xl border-2 border-black ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
       
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          
          <h1 className="text-3xl text-black sm:text-5xl font-extrabold leading-tight mb-4">
            Upgrade Your Tech Game
          </h1>

         
          <p className="lg:text-base text-sm md:text-base sm:text-lg  md:mb-6 lg:mb-6 max-w-md mx-auto md:mx-0 text-black">
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

        
        <div className="md:w-1/2 ">
          <div className="relative">
        
            <div className="w-full h-64 sm:h-80 px-14 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300">
              <span className="text-lg text-center">Latest Smartphone <br /> & Laptop</span>
            </div>  
          
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-black rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
