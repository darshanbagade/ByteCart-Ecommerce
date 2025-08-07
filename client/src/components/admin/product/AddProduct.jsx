// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    features: '',
    category: '',
  });
  const [images, setImages] = useState([null, null, null, null]); // Store up to 4 files
  const [previews, setPreviews] = useState([null, null, null, null]); // Store image previews

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      const newPreviews = [...previews];
      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('slug', formData.slug);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', Number(formData.price));
    formDataToSend.append('stock', Number(formData.stock));
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('features', formData.features.split(',').map((feature) => feature.trim()).filter(Boolean));

    images.forEach((image, index) => {
      if (image) {
        formDataToSend.append(`images[${index}]`, image);
      }
    });

    console.log('POST /products with JWT:', Object.fromEntries(formDataToSend)); // Replace with your API call
    // Example: fetch('/products', { method: 'POST', headers: { Authorization: `Bearer ${jwt}` }, body: formDataToSend })
  };

  return (
    <div className="my-10 container  min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
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
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
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
                    <span className="block text-center px-3 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200 cursor-pointer mb-2">
                      Choose Image {index + 1}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-500">
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
              value={formData.features}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg border-2 border-gray-500 hover:bg-gray-600 hover:border-gray-600 "
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-gray-200 hover:border-black "
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;