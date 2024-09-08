import React, { useEffect, useState } from 'react';
import '../pages/Style.css'
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin') {
      setIsAdmin(true);
    
    }
  }, []);

  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
        <span className='brand-name fs-4'>Yousaf</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <a className='list-group-item py-2'>
          <i className='bi bi-speedometer2 fs-5 me-3'></i>
          <span>Dashboard</span>
        </a>
        
        <Link to="/products" className='list-group-item py-2'>
          <i className='bi bi-table fs-5 me-3'></i>
          <span>Products</span>
        </Link>
        <Link to="/AdminReservations" className='list-group-item py-2'>
          <i className='bi bi-clipboard-data fs-5 me-3'></i>
          <span>Reservation</span>
        </Link>
        {isAdmin && (
        <Link to="/AdminOrders" className='list-group-item py-2'>
          <i className='bi bi-people fs-5 me-3'></i>
          <span>Customers</span>
        </Link>
        )}
        <a className='list-group-item py-2'>
          <i className='bi bi-power fs-5 me-3'></i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
