// src/components/AdminProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Iphone_01 } from '../assets/index';

const AdminProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white border-2 border-gray-700 rounded-2xl    mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
        <img
          src={product.images[0] || 'https://via.placeholder.com/100'}
          alt={product.title}
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-sm text-gray-600">Brand: {product.brand}</p>
          <p className="text-sm text-gray-600">Category: {product.category}</p>
          <p className="text-xl font-bold text-black mt-1">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
        </div>
        <div className="flex gap-4">
          <Link
            to={`/admin/products/edit/${product._id}`}
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200 "
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

AdminProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminProductCard;