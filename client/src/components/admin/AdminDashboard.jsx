import React from 'react';
import { Link } from 'react-router-dom';
import { Iphone_01, Iphone_02 } from '../../assets/index';

const AdminDashboard = () => {

  const totalOrders = 3;
  const totalProducts = 3;
  const topOrders = [
    {
      _id: '1',
      orderId: 'ORD001',
      date: '2025-08-01T10:00:00Z',
      total: 205000,
      status: 'Pending',
      paymentStatus: 'Pending',
      items: [
        { title: 'Iphone 14 Pro', quantity: 1, price: 200000, image: Iphone_01 },
        { title: 'AirPods Pro', quantity: 1, price: 5000, image: Iphone_02 },
      ],
    },
    {
      _id: '2',
      orderId: 'ORD002',
      date: '2025-08-02T12:00:00Z',
      total: 90000,
      status: 'Processing',
      paymentStatus: 'Paid',
      items: [
        { title: 'HP Spectre', quantity: 1, price: 90000, image: Iphone_02 },
      ],
    },
    {
      _id: '3',
      orderId: 'ORD003',
      date: '2025-08-03T15:00:00Z',
      total: 95000,
      status: 'Shipped',
      paymentStatus: 'Paid',
      items: [
        { title: 'AirPods Pro', quantity: 1, price: 5000, image: Iphone_02 },
        { title: 'Iphone 14 Pro', quantity: 1, price: 90000, image: Iphone_01 },
      ],
    },
  ];

  return (
    <div className="my-5 container  bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
          <p className="text-3xl font-bold text-black">{totalOrders}</p>
          <Link
            to="/admin/orders"
            className="mt-4 inline-block px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200"
          >
            View Orders
          </Link>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Total Products</h2>
          <p className="text-3xl font-bold text-black">{totalProducts}</p>
          <Link
            to="/admin/products"
            className="mt-4 inline-block px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200"
          >
            View Products
          </Link>
        </div>
      </div>
      <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Orders</h2>
        {topOrders.length > 0 ? (
          <div className="space-y-4">
            {topOrders.map((order) => (
              <div
                key={order._id}
                className="border-b-2 border-black pb-4 last:border-b-0"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">Order #{order.orderId}</h3>
                    <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                    <p className="text-sm text-gray-600">Payment: {order.paymentStatus}</p>
                  </div>
                  <Link
                    to="/admin/orders"
                    className="mt-2 sm:mt-0 px-3 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-300 hover:to-white transition duration-200 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;