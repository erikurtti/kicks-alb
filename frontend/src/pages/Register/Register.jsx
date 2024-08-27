import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaApple, FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaUser } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './Register.css';

const Register = () => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/register`, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', data.email); // Save email to local storage
                localStorage.setItem('password', data.password); // Save password to local storage
                loadCartData({ token: response.data.token });
                toast.success('Registration successful! Redirecting to login page...');
                setTimeout(() => navigate('/'), 1500); // Redirect to login page
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };
    

    const handleOAuthRegister = (provider) => {
        toast.info(`Register with ${provider} not implemented yet.`);
    };

    return (
        <div className='register-page'>
            <form onSubmit={onRegister} className="register-form">
                <img
                    src={assets.logo}
                    style={{ width: '120px', display: 'block', margin: '3px auto' }}
                    alt='Logo'
                />
                <h2>Sign Up</h2>
                <div className="email-container">
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Your name'
                        required
                    />
                    <FaUser className="user-icon" />
                </div>

                <div className="email-container">
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <FaEnvelope className="email-icon" />
                </div>
                <div className="password-container">
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        required
                    />
                    <button
                        type="button"
                        className="eye-button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?  <FaEye /> : <FaEyeSlash /> }
                    </button>
                </div>
                <button type="submit" className="register-button">
                    Create Account
                </button>
                <div className="divider">----- OR -----</div>
                <button type="button" className="oauth-button ios-button" onClick={() => handleOAuthRegister('iOS')}>
                    <FaApple className="oauth-icon" />
                    Register with iOS
                </button>
                <button type="button" className="oauth-button google-button" onClick={() => handleOAuthRegister('Google')}>
                    <FaGoogle className="oauth-icon" />
                    Register with Google
                </button>
                <div className='info-acc-reg'>
                    <span className="span-acc-log ">You have an account? </span>
                    <a href="/" className="register-link">Go to Login page</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
