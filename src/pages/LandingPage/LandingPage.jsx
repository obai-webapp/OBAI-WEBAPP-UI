import React from 'react';
import './landingPage.scss';

const LandingPage = () => {
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
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
