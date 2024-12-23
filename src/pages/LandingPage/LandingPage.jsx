import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './landingPage.scss';

const LandingPage = () => {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="landing">
            <div className="landing_wrapper">
                <div className="landing_wrapper-information">
                    <h2>Important Information</h2>
                    <p>
                        To start your car claim submission, please use the specific link provided to you by our admin.
                        This link contains a unique ID that is necessary for the process.
                    </p>

                    <p>
                        If you do not have this link, please check your email or contact our support team for
                        assistance.
                    </p>

                    {/* Login Section */}
                    <div className="landing_wrapper-login">
                        <button
                            className="login-button" // Optional: Style the button using your CSS
                            onClick={() => navigate('/admin-login')} // Navigate to /admin-login
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
