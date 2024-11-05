import React from 'react';
import damage from '@images/drr.png';

const DriverRoofRail = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Driver Roof Rail</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage} alt="Driver Roof Rail" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Inspect the driver’s roof rail for any signs of damage or scratches. Ensure the rail is intact and smooth along its length.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverRoofRail;
