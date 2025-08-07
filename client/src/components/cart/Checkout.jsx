import React from 'react';
import { Link } from 'react-router-dom';
import { Iphone_01, Iphone_02 } from '../../assets/index';
import { ScrollToTop } from '../../utils/ScrollToTop';
const Checkout = () => {
  // Dummy cart data (replace with your cart context or local storage)
  const cartItems = [
    {
      _id: '1',
      title: 'Iphone 14 Pro',
      price: 200000,
      quantity: 1,
      image: Iphone_01,
    },
    {
      _id: '2',
      title: 'AirPods Pro',
      price: 5000,
      quantity: 2,
      image: Iphone_02,
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10; // Flat rate for demo
  const total = subtotal + shipping;

  return (
    <div className="my-5 container bg-white min-h-screen">
      <ScrollToTop/>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Address */}
        <div className="lg:col-span-2 bg-white border-2 border-black rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="full name"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="your address"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="your state"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="zip"
                placeholder="pincode"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="country"
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                defaultChecked
                className="text-black focus:ring-black accent-black"
              />
              <span className="text-sm text-gray-600">Credit Card</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                className="text-black focus:ring-black accent-black"
              />
              <span className="text-sm text-gray-600">PayPal</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                className="text-black focus:ring-black accent-black" 
              />
              <span className="text-sm text-gray-600">Cash on Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Place Order
          </button>
          <Link
            to="/cart"
            className="block text-center mt-4 text-sm text-black hover:underline"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;