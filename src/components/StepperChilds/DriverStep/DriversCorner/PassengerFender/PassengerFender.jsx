import React from 'react';
import '../../../StepperMain.scss';
import front from '@images/pf.png';

const PassengerFender = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Passenger Fender</h4> {/* Updated heading color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={front} alt="front" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Replace the placeholder text */}
                        Ensure the entire fender is visible in the image, and check for any visible damages or scratches
                        before proceeding to the next step.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassengerFender;
