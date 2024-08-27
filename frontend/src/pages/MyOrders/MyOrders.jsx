import axios from 'axios';
import { jsPDF } from 'jspdf';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './MyOrders.css';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const { url, token, currency } = useContext(StoreContext);
  const { t } = useTranslation(); // Initialize the translation hook

  const fetchOrders = async () => {
    const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    setData(response.data.data);
  };


  

  const generateInvoice = (order) => {
    const doc = new jsPDF();

    // Set up fonts and styles
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(14);
    const margin = 20;
    const headerHeight = 70;
    const footerHeight = 20;
    const columnWidth = 85; // Width for each column
    const separatorWidth = 0.20; // Line width in mm (1/4 mm)

    // Calculate page height
    const pageHeight = doc.internal.pageSize.height;

    // Draw header with solid background color
    doc.setFillColor(200, 0, 0); // Red background for header
    doc.rect(0, 0, doc.internal.pageSize.width, headerHeight, 'F'); // Full width

    doc.setFontSize(15);
    doc.setTextColor((255, 255, 255)); // White color for text
    doc.text('Kicks Alb', margin, margin + 10);
    doc.setFontSize(12);
    doc.text('Phone: +355 69 547 3589', margin, margin + 19);
    doc.text('Instagram: @kicks.alb', margin, margin + 28);
    

    // Draw header line
    doc.setLineWidth(separatorWidth);
    doc.setDrawColor(255, 255, 255); // White color for line
    doc.line(0, headerHeight, doc.internal.pageSize.width, headerHeight);
    
    // Order Information and Items
    doc.setFontSize(12);
    const yOffset = margin + headerHeight + 10;

    // Draw separator line for items
    const separatorX = margin + columnWidth + 10;
    doc.setLineWidth(separatorWidth);
    doc.setDrawColor(0, 0, 0); // Black color for separator line
    doc.line(separatorX, yOffset, separatorX, pageHeight - footerHeight); // Adjusted to avoid overlap with footer

    // Order Information Column
    doc.setTextColor(0, 0, 0); // White color for text
    doc.text(`Order ID: ${order._id}`, margin, yOffset);
    doc.text(`Status: ${order.status}`, margin, yOffset + 10);
    doc.text(`Total: ${currency}${order.amount}.00`, margin, yOffset + 30);
    
    // Address
    doc.text('Delivery Address:', margin, yOffset + 50);
    doc.text(`Street: ${order.address.street}`, margin, yOffset + 60);
    doc.text(`City: ${order.address.city}`, margin, yOffset + 70);
    doc.text(`State: ${order.address.state}`, margin, yOffset + 80);
    doc.text(`Zip Code: ${order.address.zipcode}`, margin, yOffset + 90);
    doc.text(`Country: ${order.address.country}`, margin, yOffset + 100);
    doc.text(`Phone: ${order.address.phone}`, margin, yOffset + 110);
    
    // Items Column
    doc.text('Items:', separatorX + 10, yOffset);
    
    let y = yOffset + 10;
    order.items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} - ${item.quantity} x ${currency}${item.price}`, separatorX + 10, y);
        y += 10;
    });



    // Save the PDF
    doc.save(`invoice_${order._id}.pdf`);
};


  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    // Load customer data from local storage
    const savedCustomerData = localStorage.getItem('userInfo');
    if (savedCustomerData) {
      setCustomerData(JSON.parse(savedCustomerData));
    }
  }, [token]);
 
  return (
    <div className='my-orders'>
      <h2>{t('my_orders', 'My Orders')}</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.packet} alt="" />
            <p>{order.items.map((item, idx) => (
              `${item.name} x ${item.description} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`
            ))}</p>
            <p>{currency}{order.amount}.00</p>
            <p>{t("items_items", "Items:")} {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={() => generateInvoice(order)}>{t("print_invoice", "Print Invoice")}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
