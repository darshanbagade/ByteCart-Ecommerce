import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuantitySelector = ({ stock, initialQuantity = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrease = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        disabled={quantity === 1}
        className="px-4 py-2 text-black text-lg font-semibold rounded-lg border-2 border-black hover:bg-gray-200"
      >
        -
      </button>
      <span className="w-12 text-center text-lg font-semibold text-gray-800 bg-white border-2 border-gray-800 rounded-lg py-2">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={quantity === stock || stock === 0}
        className="px-4 py-2 bg-white text-lg font-semibold rounded-lg border-2 border-black hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  stock: PropTypes.number.isRequired,
  initialQuantity: PropTypes.number,
  onQuantityChange: PropTypes.func.isRequired,
};

export default QuantitySelector;