import React from 'react';
import passengerR from '@images/pfd.png';

const PassengerFrontDoor = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Passenger Front Door</h4> {/* Heading set to black */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={passengerR} alt="Passenger Front Door" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Text set to black */}
                        Inspect the passenger front door for any visible dents, scratches, or other types of damage.
                        Ensure that the door opens and closes properly, and check for any signs of misalignment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassengerFrontDoor;
