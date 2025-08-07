// src/components/CartPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartCard from './CartCard';
import { Iphone_01, Iphone_02 } from '../../assets/index';

const CartPage = () => {
  // Dummy cart data (replace with your fetched data)
  const [cartItems, setCartItems] = useState([
    {
      _id: '1',
      title: 'Iphone 14 Pro',
      brand: 'Apple',
      price: 200000,
      images: [Iphone_01, Iphone_02, Iphone_01, Iphone_02],
      stock: 10,
      quantity: 2,
    },
    {
      _id: '2',
      title: 'HP Spectre',
      brand: 'HP',
      price: 90000,
      images: [Iphone_02, Iphone_01, Iphone_02, Iphone_01],
      stock: 5,
      quantity: 1,
    },
    {
      _id: '3',
      title: 'AirPods Pro',
      brand: 'Apple',
      price: 90000,
      images: [Iphone_02, Iphone_01, Iphone_02, Iphone_01],
      stock: 8,
      quantity: 3,
    },
  ]);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle remove item
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="my-10 container bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 ml-2">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartCard
              key={item._id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
          <div className="flex justify-end mt-6 mr-4">
            <div className="text-xl font-bold text-gray-800">
              Total: ${totalPrice}
            </div>
          </div>
          <div className="flex justify-end mt-4 mr-2">
            <Link
              to="/cart/checkout"
              className="px-6 py-3 bg-white text-black rounded-lg border-2 border-black hover:bg-gray-100 "
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;