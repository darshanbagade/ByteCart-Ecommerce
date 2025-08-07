// src/components/CartCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import QuantitySelector from './QuantitySelector';
import { Iphone_01 } from '../../assets/index';

const CartCard = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="bg-white border-2 border-gray-900 rounded-2xl mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
        {/* Product Image */}
        <img
          src={item.images[0] || 'https://via.placeholder.com/100'}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
        />
        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
          <p className="text-sm text-gray-600">Brand: {item.brand}</p>
          <p className="text-xl font-bold text-black mt-1">${item.price}</p>
        </div>
        {/* Quantity Selector and Remove Button */}
        <div className="flex items-center gap-4">
          <QuantitySelector
            stock={item.stock}
            initialQuantity={item.quantity}
            onQuantityChange={(newQuantity) => onQuantityChange(item._id, newQuantity)}
          />
          <button
            onClick={() => onRemove(item._id)}
            className="px-4 py-2 text-black rounded-lg border-2 border-black hover:bg-gray-100  "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

CartCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    stock: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartCard;