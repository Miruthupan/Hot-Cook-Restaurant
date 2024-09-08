import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from '../utils/img/register.jpg';
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../services/UserService';
import './SignUp.css'; // Separate CSS file for custom styling

const SignUp = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await UserService.signup(user.name, user.email, user.password);
            toast.success('User registered successfully!');
            navigate("/");
        } catch (error) {
            setError(error.message);
            toast.error('Failed to register');
        }
    };

    const socialSignIn = () => {
        // Handle Google Sign-In here
    };

    return (
        <div className="signup-container">
            <div className="row h-100">
                {/* Left side (Form) */}
                <div className="col-md-6 d-flex align-items-center justify-content-center signup-form-section">
                    <div className="card shadow-lg p-5 signup-card">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center text-danger mb-4">Create an Account</h2>
                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input
                                    type="submit"
                                    className="btn btn-danger w-100 btn-lg"
                                    value="Sign Up"
                                />
                            </div>
                            <Toaster />
                            {error && (
                                <div className="text-danger text-center mt-3">
                                    {error}
                                </div>
                            )}
                        </form>
                        <div className="social-signin mt-4">
                            <button onClick={socialSignIn} className="btn btn-outline-dark d-flex align-items-center w-100 justify-content-center">
                                <FcGoogle className="me-2" /> Continue with Google
                            </button>
                            <Toaster />
                        </div>
                        <div className="text-center mt-4">
                            <p>Already have an account? <Link to="/login" className="text-primary">Login here</Link></p>
                        </div>
                    </div>
                </div>

                {/* Right side (Image) */}
                <div className="col-md-6 d-none d-md-block signup-image-section">
                    <img
                        src={image}
                        alt="Register"
                        className="img-fluid signup-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
