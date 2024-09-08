import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CheckoutForm = () => {
    const location = useLocation();
    const { cart, userId } = location.state || { cart: [], userId: null };
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const validatePaymentDetails = () => {
        // Validate card number
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            setError("Card number must be exactly 16 digits.");
            return false;
        }

        // Validate expiry date in MM/YY format
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            setError("Expiry date must be in MM/YY format.");
            return false;
        }

        // Validate CVV (must be 3 or 4 digits)
        if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
            setError("CVV must be 3 or 4 digits.");
            return false;
        }

        setError(""); // Clear errors if all validations pass
        return true;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!validatePaymentDetails()) {
            return;
        }

        try {
            // Prepare order data to send to backend
            const currentDate = new Date().toISOString().slice(0, 19);
            const foodItemIds = cart.map(item => item.id);
            const quantities = cart.map(item => item.quantity);

            const orderData = {
                userId: userId, // User ID
                foodItemIds: foodItemIds,
                quantities: quantities,
                totalPrice: totalAmount,
                orderDate: currentDate, // Current date & time
            };

            // Send order data to backend
            await axios.post("http://localhost:8080/api/order/create", orderData);

            // Show success modal
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Failed to submit order", error);
        }
    };

    return (
        <div className="container" style={{ margin: '130px' }}>
            <div className="row">
                {/* Left Side: Order Summary */}
                <div className="col-md-6">
                    <h4>Your Order</h4>
                    <ul className="list-group">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {item.name} - ₹{item.price} x {item.quantity}
                                <span>₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="text-end mt-3">
                        <h5>Total: ₹{totalAmount}</h5>
                    </div>

                    <div className="text-end mt-3">
                        <label className="form-label text-left" htmlFor="tableNoDropdown">Table No</label>
                        <select className="form-select" id="tableNoDropdown" aria-label="Select table number">
                            <option value="">Select a table number</option>
                            {[...Array(12).keys()].map(number => (
                                <option key={number + 1} value={number + 1}>
                                    {number + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="col-md-6">
                    <h4>Payment Details</h4>
                    <form>

                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                maxLength={16}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Expiry Date</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CVV</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                maxLength={4}
                                required
                            />
                        </div>
                        {error && <div className="text-danger mb-3">{error}</div>}
                        <Button variant="success" onClick={handlePayment}>
                            Make Payment
                        </Button>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for your payment! Your order will be served shortly.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CheckoutForm;
