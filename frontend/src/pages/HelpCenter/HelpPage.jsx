import React from 'react';
import { FaCommentDots, FaEnvelope, FaFileContract, FaHome, FaLock, FaShieldAlt, FaTachometerAlt, FaUserCog } from 'react-icons/fa';
import { assets } from '../../assets/assets';
import './HelpPage.css';

const HelpPage = () => {
    return (
        <div className="help-page">
            <header className="help-header">
                <div className="logo">
                    <img src={assets.logo} alt="Help Center Logo" className="logo-img"  />
                    <p className="help-title">Help Center</p>
                </div>
                <div className="header-options">
                    <input type="text" className="search-input" placeholder="Search help articles..." />
                    <select className="language-select">
                        <option value="en-US">English (US)</option>
                        <option value="al">Albanian</option>
                    </select>
                </div>
            </header>
            <div className="content-wrapper1">
                <nav className="sidebar">
                    <ul>
                        <li><a href="#features"><FaTachometerAlt /> <p>KicksAlb Features</p> </a></li>
                        <li><a href="#manage"><FaUserCog /> <p>Manage Your Account</p> </a></li>
                        <li><a href="#safety"><FaShieldAlt /> <p>Staying Safe</p> </a></li>
                        <li><a href="#privacy"><FaLock /> <p>Privacy, Security and Reporting</p> </a></li>
                        <li><a href="#terms"><FaFileContract /> <p>Terms and Policies</p> </a></li>
                        <li><a href="#contact"><FaEnvelope /> <p>Contact Us</p> </a></li>
                        <li><a href="#feedback"><FaCommentDots /> <p>Feedback</p> </a></li>
                        <li><a className='help-home' href="/home"><FaHome /> <p>Home</p> </a></li>
                    </ul>
                </nav>
                <main className="main-content">
                    <section id="features">
                        <h1>KicksAlb Features</h1>
                        <p>KicksAlb provides a diverse set of features designed to enhance your user experience and streamline your interactions with our platform. Here’s a more detailed look:</p>
                        <ul>
                            <li><strong>Personalized Recommendations:</strong> Our recommendation engine analyzes your activity, preferences, and interactions to provide tailored suggestions that are relevant to your interests. You can discover new content and services that you might not have found otherwise, improving your overall engagement with the platform.</li>
                            <li><strong>Intuitive User Interface:</strong> Our platform features a clean, user-friendly design that makes it easy to navigate and find what you’re looking for. Whether you’re using a desktop or mobile device, our interface adapts to provide a seamless browsing experience with quick access to key features and content.</li>
                        </ul>
                    </section>
                    <section id="manage">
                        <h1>Manage Your Account</h1>
                        <p>Effective management of your account is essential for maintaining control over your settings and information. Here’s a comprehensive guide to managing your account:</p>
                        <ul>
                            <li><strong>Correct Profile Information:</strong> Easily put your personal details such as your name, email address, through the register and login page. Keeping your profile current ensures accurate communication and helps others recognize you on the platform.</li>
                            <li><strong>Put a Strong Password:</strong> Choose a strong, unique password that combines letters, numbers, and symbols to protect your account from unauthorized access.</li>
                            <li><strong>Account Deletion:</strong> If you decide to permanently delete your account, follow the outlined steps carefully. Make sure to back up any important data before proceeding, as account deletion is irreversible and will remove all associated information.</li>
                        </ul>
                    </section>
                    <section id="safety">
                        <h1>Staying Safe</h1>
                        <p>Your safety is our top priority. Follow these best practices to protect your account and personal information:</p>
                        <ul>
                            <li><strong>Use Strong, Unique Passwords:</strong> Create complex passwords that are difficult for others to guess. Avoid using easily identifiable information, and consider using a password manager to generate and store unique passwords for different sites and services.</li>
                            <li><strong>Monitor Account Activity:</strong> Regularly check your account activity for any unusual or unauthorized actions. If you notice any discrepancies or signs of suspicious behavior, take immediate action to secure your account and contact our support team for assistance.</li>
                        </ul>
                    </section>
                    <section id="privacy">
                        <h1>Privacy, Security and Reporting</h1>
                        <p>Our commitment to protecting your privacy and security is reflected in our policies and procedures. Here’s how we safeguard your information and address issues:</p>
                        <ul>
                            <li><strong>Review Our Privacy Policy:</strong> Our privacy policy details how we collect, use, and protect your personal information. It outlines your rights regarding your data and how we ensure its confidentiality and security. Regularly review this policy to stay informed about our practices.</li>
                            <li><strong>Security Measures:</strong> We implement robust security measures to protect your data from unauthorized access. This includes encryption, secure data storage, and regular security audits to identify and address potential vulnerabilities.</li>
                            <li><strong>Reporting Suspicious Activity:</strong> If you encounter any suspicious activity or believe your account has been compromised, follow our reporting guidelines to notify us. Provide detailed information about the issue to help us investigate and take appropriate action.</li>
                        </ul>
                    </section>
                    <section id="terms">
                        <h1>Terms and Policies</h1>
                        <p>Understanding our terms and policies is crucial for a clear and compliant use of our services. Here’s what you need to know:</p>
                        <ul>
                            <li><strong>Terms of Service:</strong> Our terms of service outline the rules and guidelines for using our platform. They include information about your rights and responsibilities, acceptable use, and procedures for handling disputes. Make sure to read and understand these terms before using our services.</li>
                            <li><strong>Acceptable Use Policy:</strong> Review our acceptable use policy to understand what constitutes appropriate behavior on our platform. This policy helps maintain a respectful environment and ensures that all users adhere to the same standards of conduct.</li>
                        </ul>
                    </section>
                    <section id="contact">
                        <h1>Contact Us</h1>
                        <p>If you need further assistance or have questions that are not covered in our help articles, here’s how you can reach out to us:</p>
                        <ul>
                            <li><strong>Email Support:</strong> Send us an email detailing your issue or question. Our support team will review your message and provide a response as soon as possible. Be sure to include relevant details to expedite the process.</li>
                            <li><strong>Live Chat:</strong> Use our live chat feature for immediate support. Connect with a representative who can assist you in real time, helping you resolve issues or answer questions quickly.</li>
                            <li><strong>Phone Support:</strong> Call our support hotline for direct assistance. Our customer service team is available to help with more complex issues or provide personalized support over the phone.</li>
                        </ul>
                    </section>
                    <section id="feedback">
                        <h1>Feedback</h1>
                        <p>Your feedback is essential to our continuous improvement. Share your experiences and suggestions to help us enhance our services:</p>
                        <ul>
                            <li><strong>Submit Feedback:</strong> Fill out our feedback form to provide detailed comments about your experience with our platform. Your input helps us understand what we’re doing well and where we can improve.</li>
                            <li><strong>Rate Your Experience:</strong> Give us a rating based on your overall satisfaction with our services. This helps us gauge user satisfaction and make necessary improvements.</li>
                            <li><strong>Participate in Surveys:</strong> Occasionally, we conduct surveys to gather more in-depth feedback. Participating in these surveys allows us to gain deeper insights into user needs and preferences.</li>
                        </ul>
                    </section>
                    <div className="helpful-box">
                        <span>Was this helpful?</span>
                        <button className="yes-btn">Yes</button>
                        <button className="no-btn">No</button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HelpPage;
