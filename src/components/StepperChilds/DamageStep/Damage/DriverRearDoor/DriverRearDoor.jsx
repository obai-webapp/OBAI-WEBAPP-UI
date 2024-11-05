import React from 'react';
import damage1 from '@images/drd.png';

const DriverRearDoor = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Driver Rear Door</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage1} alt="Driver Rear Door" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Inspect the driver’s rear door for any visible dents, scratches, or other damage. Ensure the panel is smooth and free from defects.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverRearDoor;
