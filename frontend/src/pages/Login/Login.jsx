import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaApple, FaEnvelope, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './Login.css';

const Login = () => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Retrieve saved data from local storage on component mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('email') || '';
        const savedPassword = localStorage.getItem('password') || '';
        setData({ email: savedEmail, password: savedPassword });
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${url}/api/user/login`, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                loadCartData({ token: response.data.token });
                toast.success('Login successful!');
                navigate('/home');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleOAuthLogin = (provider) => {
        toast.info(`Login with ${provider} not implemented yet.`);
    };

    return (
        <div className='login-page2'>
            <form onSubmit={onLogin} className="login-form2">
                <img
                    src={assets.logo}
                    style={{ width: '120px', display: 'block', margin: '3px auto' }}
                    alt=''
                />
                <h2>Login</h2>
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
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <button type="submit" disabled={loading} className="login-button">
                    {loading ? <div className="spinner"></div> : 'Login'}
                </button>
                <div className="divider">----- OR -----</div>
                <button type="button" className="oauth-button ios-button" onClick={() => handleOAuthLogin('iOS')}>
                    <FaApple className="oauth-icon" />
                    Login with iOS
                </button>
                <button type="button" className="oauth-button google-button" onClick={() => handleOAuthLogin('Google')}>
                    <FaGoogle className="oauth-icon" />
                    Login with Google
                </button>
                <div className='info-acc'>
                    <span className="span-acc-log">Don't have an account?</span>
                    <a href="/register" className="register-link">Create today!</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
