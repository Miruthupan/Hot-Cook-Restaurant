import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Table, Button } from 'react-bootstrap';
import '../App.css'; // Assuming some general styles
import { getAllOrders, deleteOrder } from '../services/OrderService'; // Import the service
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function AdminOrders() {
  const [toggle, setToggle] = useState(true);
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error(`Failed to delete order with id ${id}`, error);
    }
  };

  const handleViewOrder = (order) => {
    const items = order.orderItems.map(item => `${item.foodItem.name} (x${item.quantity})`).join(', ');
    alert(`Viewing order for ${order.user.name}. Ordered items: ${items}`);
  };

  const totalOrderPrice = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  const generatePDF = async () => {
    const input = document.getElementById('ordersTable'); // Get the table element

    // Convert HTML to canvas
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    // Create a PDF document
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add another page if necessary
    let position = heightLeft;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add the total price at the end of the PDF
    pdf.addPage(); // Add a new page for the total price
    pdf.setFontSize(12);
    pdf.text('Total Order Price: $' + totalOrderPrice.toFixed(2), 10, 10);

    // Save the PDF
    pdf.save('orders.pdf');

  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}

        <div className={toggle ? 'col-8 mt-4 col-md-10 offset-md-2' : 'col'}>
          <div className="p-5">
            <Button variant="primary" onClick={Toggle} className="mb-3">
              {toggle ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>

            <Button variant="success" onClick={generatePDF} className="mb-3">
              Download PDF
            </Button>

            <h1 className="text-light">Customer Food Orders</h1>
            
            <Table striped bordered hover variant="light" id="ordersTable" className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Items Ordered</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.user ? order.user.name : 'Unknown'}</td>
                      <td>{order.orderItems && order.orderItems.length > 0
                        ? order.orderItems.map(item => `${item.foodItem.name} (x${item.quantity})`).join(', ')
                        : 'No items'
                      }</td>
                      <td>${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</td>
                      <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Not available'}</td>
                      <td>{order.status}</td>
                      <td>
                       
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
