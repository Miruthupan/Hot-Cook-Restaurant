import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ReservationImage from '../utils/img/table.jpg'; // Replace with your image path
 // Assuming UserService contains your reservation method
import './About.css';

import ReservationService from '../services/ReservationService';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    people: '',
    startdatetime: '', 
    enddatetime:''
  });

  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const availableTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // Array representing table numbers

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    // Get the user ID from localStorage after login
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleTableSelection = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Split the datetime field into start_time and end_time (assuming 2 hours for example)
      const start_time = new Date(formData.startdatetime).toISOString().replace('T', ' ').substring(0, 19);
      const end_time = new Date(formData.enddatetime).toISOString().replace('T', ' ').substring(0, 19);
     
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }
      // Call the reservation method from the service
      const response = await ReservationService.reservation(
        formData.name,
        start_time,
        end_time,
        selectedTable,
        formData.people,
        userId
      );

      alert(`Reservation successful for ${formData.name} at Table ${selectedTable}`);

    } catch (error) {
      // Display error if the reservation fails
      setError(error.message);
    }
  };

  return (
    <div className='about-page container mt-5'>
      <header className='mt-5 mb-5'>
        <div className='container h-100 d-flex align-items-center justify-content-center'>
          <h1 className='text-light'>Make Reservation</h1>
        </div>
      </header>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="people">
              <Form.Label>No. of People</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of people"
                name="people"
                value={formData.people}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="datetime">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startdatetime"
                value={formData.startdatetime}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="datetime">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="enddatetime"
                value={formData.enddatetime}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h4 className="mb-3">Available Tables</h4>
        <Row>
          {availableTables.map((table) => (
            <Col xs={3} md={2} key={table}>
              <Form.Check
                type="radio"
                label={`Table ${table}`}
                name="table"
                value={table}
                onChange={handleTableSelection}
                checked={selectedTable == table}
              />
            </Col>
          ))}
        </Row>

        {error && <div className="text-danger mt-3">{error}</div>}

        <Button variant="primary" type="submit" className="mt-4">
          Reserve Table
        </Button>
      </Form>
    </div>
  );
};

export default ReservationForm;
