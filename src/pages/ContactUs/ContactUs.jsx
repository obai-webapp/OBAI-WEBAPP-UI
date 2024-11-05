import React from 'react';
import './ContactUs.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContactUs = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <div className="contact-us">
            <h4>Contact Us</h4>
            <div className="contact-form">
                <div className="contact-item">
                    <h5>Phone</h5>
                    <p>
                        <a href="tel:+12345678901">+1 (234) 567-8901</a>
                    </p>
                </div>
                <div className="contact-item mt-4">
                    <h5>Email</h5>
                    <p>
                        <a href="mailto:Kameron@OpenBayAutos.com">Kameron@OpenBayAutos.com</a>
                    </p>
                </div>
            </div>

            <div className="back-button-container">
                <button
                    className="back-button"
                    type="button"
                    onClick={() => navigate(-1)}
                    style={{
                        backgroundColor: '#FF5F1E', // Primary button color
                        color: '#FFF',
                        borderRadius: '36px',
                        fontSize: '16px',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ContactUs;
