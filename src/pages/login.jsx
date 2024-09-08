import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from '../utils/img/login.png';
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../services/UserService';
import './Login.css'; // Assuming we have a separate CSS file for extra styling

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const from = location.state?.from?.pathname || "/";

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
            const response = await UserService.login(user.email, user.password);

            if (response) {
                toast.success('User Logged in successfully!');
                localStorage.setItem('userId', response.id);

                if (response.name.toLowerCase() === "admin") {
                    localStorage.setItem('userRole', 'admin');
                    navigate("/admin");
                }
                else if(response.name.toLowerCase() == "hotcook") {
                    localStorage.setItem('userRole', 'employee');
                    navigate("/admin");
                }
                else
                    navigate("/reservations");
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError(error.message);
            toast.error('Failed to login');
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="row">
                {/* Image Section */}
                <div className="col-md-6 login-image-section">
                    <img src={image} alt="Login" className="img-fluid login-image"/>
                </div>

                {/* Form Section */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="card shadow-lg p-4 login-card">
                        <div className="card-body">
                            <h2 className="text-center text-danger mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="form-control"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="form-control"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-danger btn-block">Login</button>
                                    <Toaster />
                                </div>
                            </form>
                            {error && (
                                <div className="text-danger text-center mt-3">
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="text-center mt-3">
                            <Link className="btn btn-outline-dark btn-google">
                                <FcGoogle className="me-2" />
                                Continue with Google
                            </Link>
                        </div>
                        <div className="card-footer text-center mt-4">
                            <p>
                                New to Food Monster?{' '}
                                <Link to="/signup" className="text-danger">
                                    Sign Up here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
