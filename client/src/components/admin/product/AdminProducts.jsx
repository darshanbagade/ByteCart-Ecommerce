// src/components/AdminProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AdminProductCard from './AdminProductCard';
import { Iphone_01, Iphone_02 } from '../../../assets/index';

const AdminProducts = () => {
  // Dummy product data (replace with your fetched data via GET /products)
  const products = [
    {
      _id: '1',
      title: 'Iphone 14 Pro',
      slug: 'iphone-14-pro',
      brand: 'Apple',
      category: 'Phone',
      price: 200000,
      images: [Iphone_01, Iphone_02, Iphone_01, Iphone_02],
      stock: 10,
      description: 'The iPhone 14 Pro features a 6.1-inch Super Retina XDR display.',
      features: ['A16 Bionic Chip', 'Triple Camera System', '5G Support'],
    },
    {
      _id: '2',
      title: 'HP Spectre',
      slug: 'hp-spectre',
      brand: 'HP',
      category: 'Laptop',
      price: 90000,
      images: [Iphone_02, Iphone_01, Iphone_02, Iphone_01],
      stock: 5,
      description: 'A powerful laptop with sleek design.',
      features: ['Intel i7', '16GB RAM', '1TB SSD'],
    },
    {
      _id: '3',
      title: 'AirPods Pro',
      slug: 'airpods-pro',
      brand: 'Apple',
      category: 'Headphones',
      price: 90000,
      images: [Iphone_02, Iphone_01, Iphone_02, Iphone_01],
      stock: 8,
      description: 'Wireless earbuds with noise cancellation.',
      features: ['Active Noise Cancellation', 'Wireless Charging'],
    },
  ];

  const handleDelete = (id) => {
    console.log(`DELETE /products/${id} with JWT`); // Replace with your DELETE API call
    // Example: fetch(`/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${jwt}` } })
  };

  return (
    <div className="my-5 container min-h-screen">
      <div className="flex justify-between  mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Products</h1>
        <Link
          to="/admin/products/add"
          className="px-6 py-3 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
        >
          Add Product
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <AdminProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No products found.</p>
      )}
    </div>
  );
};

export default AdminProducts;