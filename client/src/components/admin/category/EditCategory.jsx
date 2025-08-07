import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';

const EditCategory = () => {

  const navigate = useNavigate()

  const category = {
    _id: '1',
    name: 'Smartphones',
    description: 'All types of smartphones and accessories',
  };

  return (
    <div className="my-5 container   min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Category</h1>
      <form className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={category.name}
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
              defaultValue={category.description}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Link
            to="/admin/categories"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;