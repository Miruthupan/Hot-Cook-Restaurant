import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Table, Button } from 'react-bootstrap';
import ReservationService from '../services/ReservationService'; // Import your service

function AdminReservations() {
  const [toggle, setToggle] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const Toggle = () => {
    setToggle(!toggle);
  };

  // Fetch all reservations when the component mounts
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await ReservationService.getAllReservations();
        setReservations(response); // Update state with fetched reservations
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ReservationService.deleteReservation(id);
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        <div className={toggle ? 'col-8 col-md-10 offset-md-2' : 'col'}>
          <div className="p-3">
            <Button variant="primary" onClick={Toggle}>
              {toggle ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
            <h1 className="mb-6">.</h1>
            <h1>.</h1>
            <h1 className="mb-6">Reservations Management</h1>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>No of People</th>
                  <th>Table No</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length > 0 ? (
                  reservations.map((reservation, index) => (
                    <tr key={reservation.id}>
                      <td>{index + 1}</td>
                      <td>{reservation.customerName}</td>
                      <td>{reservation.numberOfPeople}</td>
                      <td>{reservation.tableNumber}</td>
                      <td>{reservation.startTime}</td>
                      <td>{reservation.endTime}</td>
                      <td>{reservation.user ? reservation.user.name : 'Unknown'}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(reservation.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No reservations found.
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

export default AdminReservations;
