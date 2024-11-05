import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUsAdmin.scss';

const ContactUsAdmin = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-us">
            <h4>Contact</h4>
            <div className="contact-form">
                <div>
                    <h5>Phone</h5>
                    <p>
                        <a href="tel:+12345678901">+1 (234) 567-8901</a>
                    </p>
                </div>
                <div className="mt-4">
                    <h5>Email</h5>
                    <p>
                        <a href="mailto:Kameron@OpenBayAutos.com">Kameron@OpenBayAutos.com</a>
                    </p>
                </div>
            </div>

            <div>
                <button className="lato-regular with-background" type="buttom" onClick={() => navigate('/admin-login')}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default ContactUsAdmin;
