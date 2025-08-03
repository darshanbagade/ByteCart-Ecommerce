// src/components/ProductDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Iphone_01, Iphone_02, Iphone_03, Iphone_04} from '../assets/index';

const ProductDetails = ({
    product = product
}) => {

  const { slug } = useParams();

//   const product = product; 

  const [mainImage, setMainImage] = useState(product.images[0] );

  const [quantity, setQuantity] = useState(1);

// Helper functions for quantity control
const stock = product.stock;

const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
};

const handleIncrease = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
};

return (
    <div className="container mx-auto md:py10 lg:my-10 bg-white min-h-screen">
        <div className="lg:flex lg:gap-8">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
                <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-2xl mb-4  "
                />
                <div className="grid grid-cols-4 gap-2 lg:pt-6 mg:pt-6">
                    {product.images.slice(0, 4).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${product.title} view ${index + 1}`}
                            className={`w-full h-24 object-cover rounded-lg border-2 cursor-pointer ${
                                mainImage === img ? 'border-gray-900' : 'border-gray-200'
                            }`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 mt-6 lg:mt-0 border-2 p-4 rounded-2xl ">
                <h1 className="text-2xl font-semibold text-gray-800">{product.title}</h1>
                <p className="text-sm text-gray-600 mt-1">Brand: {product.brand}</p>
                <p className="text-sm text-gray-600">Category: {product.category}</p>
                <p className="text-3xl font-bold text-black mt-2">${product.price}</p>

                <p className="text-sm text-gray-600 mt-4">{product.description}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Features</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">Rating: {product.ratingAvg || 'No ratings yet'} / 5</p>
                    <p className="text-sm text-gray-600">
                        Reviews: {product.reviews.length || 'No reviews yet'}
                    </p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <button
                        onClick={handleDecrease}
                        disabled={quantity === 1}
                        className="px-3 py-1 bg-white text-black text-lg font-semibold rounded-lg border-2 border-black   cursor-pointer active:bg-gray-200 "
                    >
                        -
                    </button>
                    <span className="w-10 px-2 py-1 text-center text-lg font-semibold text-gray-800 bg-white border-2 border-black rounded-lg  ">
                        {quantity}
                    </span>
                    <button
                        onClick={handleIncrease}
                        disabled={quantity === stock || stock === 0}
                        className="px-3 py-1 bg-white text-black text-lg font-semibold rounded-lg border-2 border-black   cursor-pointer active:bg-gray-200"
                    >
                        +
                    </button>
                </div>
                <button className="mt-6  text-black bo px-5 py-3 border-black border-2 rounded-2xl  cursor-pointer active:bg-gray-200">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);
};

export  {ProductDetails};