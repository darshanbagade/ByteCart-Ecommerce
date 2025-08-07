// src/components/OrderCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Iphone_01 } from '../../assets/index';

const OrderCard = ({ order, onViewDetails }) => {
  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl">
      <div className="p-4">
        {/* Order Summary */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Order #{order._id}
            </h3>
            <p className="text-sm text-gray-600">
              Placed on: {new Date(order.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Status: {order.status}</p>
          </div>
          <button
            onClick={() => onViewDetails(order._id)}
            className="px-4 py-2 text-black rounded-lg border-2 border-black hover:bg-gray-100 cursor-pointer"
          >
            View Details
          </button>
        </div>
        {/* Order Items */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-gray-200 pt-4"
            >
              <img
                src={item.images[0] || 'https://via.placeholder.com/100'}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
              />
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-800 truncate">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                <p className="text-sm text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <p className="text-base font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className="flex justify-end mt-4">
          <p className="text-lg font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default OrderCard;