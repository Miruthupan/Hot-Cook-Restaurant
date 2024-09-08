import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Home from './Home';
import Content from '../components/Content';
import { Link } from 'react-router-dom'; 

function AdminPage() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}
        
      </div>
    </div>
  );
}

export default AdminPage;
