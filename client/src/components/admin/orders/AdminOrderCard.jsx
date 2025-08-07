// src/components/OrderCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Iphone_01 } from '../../../assets/index';

const OrderCard = ({ order }) => {
  const isAdmin = true; 
  
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
    console.log('Order status changed to:', e.target.value);
  };

  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
    console.log('Payment status changed to:', e.target.value);
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl ">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h3>
            <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Status: {orderStatus}</p>
            <p className="text-sm text-gray-600">Payment: {paymentStatus}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4 sm:mt-0">
            {isAdmin ? (
              <>
                <div >
                  <p>Order Status</p>
                  <select
                    value={orderStatus}
                    onChange={handleOrderStatusChange}
                    className="px-3 py-2 border-2 border-black rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <p>Payment</p>
                  <select
                    value={paymentStatus}
                    onChange={handlePaymentStatusChange}
                    className="px-3 py-2 border-2 border-black rounded-lg text-sm text-gray-800 focus:outline-none focus:border-black"
                  >
                    <option value="Pending"
                    className='focus:bg-gray-100'
                    >Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </>
            ) : (
              order.status === 'Pending' && (
                <button
                  className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-linear-to-br hover:from-gray-400 hover:to-white transition duration-200"
                >
                  Cancel Order
                </button>
              )
            )}
          </div>
        </div>
        <div className="border-t-2 border-black pt-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Items</h4>
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2"
            >
              <img
                src={item.image || Iphone_01}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg border-2 border-black"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderCard;