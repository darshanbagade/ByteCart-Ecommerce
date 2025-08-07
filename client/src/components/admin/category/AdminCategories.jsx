// src/components/AdminCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white border-2 border-black rounded-2xl mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.description || 'No description'}</p>
        </div>
        <div className="flex gap-4">
          <Link
            to={`/admin/categories/edit/${category._id}`}
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Edit
          </Link>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

const AdminCategories = () => {
  // Dummy category data (replace with fetched data via GET /all-categories)
  const categories = [
    {
      _id: '1',
      name: 'Smartphones',
      description: 'All types of smartphones and accessories',
    },
    {
      _id: '2',
      name: 'Laptops',
      description: 'Laptops and related accessories',
    },
    {
      _id: '3',
      name: 'Headphones',
      description: 'Wireless and wired headphones',
    },
  ];

  return (
    <div className="my-5 container  bg-white min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Categories</h1>
        <Link
          to="/admin/categories/add"
          className="px-6 py-3 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
        >
          Add Category
        </Link>
      </div>
      {categories.length > 0 ? (
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No categories found.</p>
      )}
    </div>
  );
};

export default AdminCategories;