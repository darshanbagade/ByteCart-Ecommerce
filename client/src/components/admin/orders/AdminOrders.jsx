import React from 'react';
import AdminOrderCard from './AdminOrderCard';
import { Iphone_01, Iphone_02 } from '../../../assets/index';

const AdminOrders = () => {
  const orders = [
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
    <div className="my-5 container  min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <AdminOrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default AdminOrders;