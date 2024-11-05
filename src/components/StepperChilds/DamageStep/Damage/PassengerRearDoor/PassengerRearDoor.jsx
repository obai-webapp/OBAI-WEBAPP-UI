import React from 'react';
import damage from '@images/prd.png';

const PassengerRearDoor = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Passenger Rear Door</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage} alt="Passenger Rear Door" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Check the passenger rear door for any dents, scratches, or paint damage. Ensure the door opens 
                        and closes properly and inspect the seal to confirm that it is intact without any cracks or wear.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassengerRearDoor;
