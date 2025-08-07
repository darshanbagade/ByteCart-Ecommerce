import React from 'react';
import OrderCard from './OrderCard';
import { Iphone_01, Iphone_02 } from '../../assets/index';

const OrderList = () => {
  // Dummy order data (replace with your fetched data)
  const orders = [
    {
      _id: 'ORD001',
      date: '2025-08-01T10:00:00Z',
      status: 'Pending',
      items: [
        {
          _id: '1',
          title: 'Iphone 14 Pro',
          brand: 'Apple',
          price: 200000,
          images: [Iphone_01, Iphone_02, Iphone_01, Iphone_02],
          quantity: 2,
        },
        {
          _id: '2',
          title: 'AirPods Pro',
          brand: 'Apple',
          price: 90000,
          images: [Iphone_02, Iphone_01, Iphone_02, Iphone_01],
          quantity: 1,
        },
      ],
    },
    {
      _id: 'ORD002',
      date: '2025-07-30T15:30:00Z',
      status: 'Shipped',
      items: [
        {
          _id: '3',
          title: 'HP Spectre',
          brand: 'HP',
          price: 90000,
          images: [Iphone_02, Iphone_01, Iphone_02, Iphone_01],
          quantity: 1,
        },
      ],
    },
  ];

  const handleViewDetails = (id) => {
    console.log(`View details for order: ${id}`); // Replace with your logic
  };

  return (
    <div className="my-10 container min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;