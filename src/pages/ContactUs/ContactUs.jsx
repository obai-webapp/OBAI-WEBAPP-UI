import React from 'react';
import './ContactUs.scss';
import { useNavigate } from 'react-router-dom';
import logo from '@logos/OBAI_Branding_FullColorLogo.png';

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-us">
            <div className="logo">
                <img src={logo} alt="Obai Logo" />
            </div>
            <h4>Contact</h4>
            <div className="contact-form">
                <div className="contact-item">
                    <h5>Phone</h5>
                    <p>
                        <a href="tel:+12345678901">+1 (234) 567-8901</a>
                    </p>
                </div>
                <div className="contact-item">
                    <h5>Email</h5>
                    <p>
                        <a href="mailto:kameron@openbayautos.com">kameron@openbayautos.com</a>
                    </p>
                </div>
            </div>
            <div className="back-button-container">
                <button
                    className="back-button"
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ContactUs;
