// src/components/ProductList.jsx
import React from 'react';
import { ProductCard } from '../components/index';
import { Iphone_01, Iphone_02 } from '../assets/index';

const ProductList = ({
  category = "",
  productRange = 4

}) => {
  const products = [
    {
      _id: 1,
      name: 'Iphone',
      slug:"iphone-15-pro",
      price: 200000,
      category: 'Mobile',
      image: Iphone_01,
    },
    {
      _id: 2,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 200000,
      category: 'Mobile',
      image: Iphone_02,
    },
    {
      _id: 3,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 200000,
      category: 'Mobile',
      image: Iphone_01,
    },
    {
      _id: 4,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 200000,
      category: 'Mobile',
      image: Iphone_02,
    },
    {
      _id: 5,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 200000,
      category: 'Mobile',
      image: Iphone_01,
    },
    {
      _id: 7,
      name: 'HP',
      slug:"iphone-14-pro",
      price: 40000,
      category: 'Laptop',
      image: Iphone_01,
    },
    {
      _id: 8,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 90000,
      category: 'Laptop',
      image: Iphone_02,
    },
    {
      _id: 9,
      name: 'HP',
      price: 40000,
      slug:"iphone-14-pro",
      category: 'Laptop',
      image: Iphone_01,
    },
    {
      _id: 10,
      name: 'HP',
      slug:"iphone-14-pro",
      price: 40000,
      category: 'Laptop',
      image: Iphone_01,
    },
    {
      _id: 11,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 90000,
      category: 'Headphones',
      image: Iphone_02,
    },
    {
      _id: 12,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 90000,
      category: 'Headphones',
      image: Iphone_02,
    },
    {
      _id: 13,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 90000,
      category: 'Headphones',
      image: Iphone_02,
    },
    {
      _id: 14,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 90000,
      category: 'Headphones',
      image: Iphone_02,
    },
    {
      _id: 15,
      name: 'Iphone',
      slug:"iphone-14-pro",
      price: 90000,
      category: 'Headphones',
      image: Iphone_02,
    },
  ];

  return (
    <div className="my-10 container mx-auto">
      {/* Mobiles Section */}
      <div className="my-4 text-xl font-semibold">{category}</div>
      <div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-11 lg:gap-11 ">
            {products
              .filter((product) => product.category === category)
              .slice(0, productRange)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No products found.</p>
        )}
      </div>
        
    </div>


        
  );
};

export { ProductList };