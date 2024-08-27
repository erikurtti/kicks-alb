import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets, currency, url } from '../../assets/assets';
import './Orders.css';

const Order = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <p>Order Page</p>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-shoe'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " - " + item.description + " ( x " + item.quantity+" )"
                  }
                  else {
                    return item.name + " - " + item.description + " ( x " + item.quantity+")" + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>{currency}{order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} name="" id="">
              <option className='on-dark' value="Order Placed">Order Placed</option>
              <option className='on-dark' value="Packing">Packing</option>
              <option className='on-dark' value="Out for delivery">Out for delivery</option>
              <option className='on-dark' value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
