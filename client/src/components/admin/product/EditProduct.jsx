import React from 'react';
import { Link } from 'react-router-dom';
import { Iphone_01, Iphone_02 } from '../../../assets/index';

const EditProduct = () => {
  const product = {
    _id: '1',
    title: 'Iphone 14 Pro',
    slug: 'iphone-14-pro',
    description: 'The iPhone 14 Pro features a 6.1-inch Super Retina XDR display.',
    price: 200000,
    stock: 10,
    brand: 'Apple',
    features: 'A16 Bionic Chip, Triple Camera System, 5G Support',
    category: 'Phone',
    images: [Iphone_01, Iphone_02, null, null],
  };

  return (
    <div className="my-10 container bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h1>
      <form className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={product.title}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={product.slug}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={product.description}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              defaultValue={product.stock}
              required
              min="0"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              defaultValue={product.brand}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              defaultValue={product.category}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Images (up to 4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <label className="w-full">
                    <span className="block text-center px-3 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200 cursor-pointer">
                      Choose Image {index + 1}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  {product.images[index] ? (
                    <img
                      src={product.images[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 mt-2"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-500 mt-2">
                      No Image
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Features (comma-separated)
            </label>
            <input
              type="text"
              name="features"
              defaultValue={product.features}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;