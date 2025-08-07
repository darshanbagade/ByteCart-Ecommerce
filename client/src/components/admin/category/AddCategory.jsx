import React from 'react';
import { Link } from 'react-router-dom';

const AddCategory = () => {
  return (
    <div className="my-10 container bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Category</h1>
      <form className="bg-white border-2 border-black p-4 rounded-2xl">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Smartphones"
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="e.g., All types of smartphones and accessories"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              rows="4"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Link
            to="/admin/categories/"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;