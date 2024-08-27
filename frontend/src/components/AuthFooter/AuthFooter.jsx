import React from 'react';
import './AuthFooter.css';

const AuthFooter = () => {
    return (
        <footer className="auth-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <div className="footer-links-row">
                        <a href="/kickalb-help-center">KicksAlb Help Center</a>
                    </div>
                    <div className="footer-links-row1">
                        <span>English (UK)</span>
                        <span>© 2024 KicksAlb from Meta</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;
