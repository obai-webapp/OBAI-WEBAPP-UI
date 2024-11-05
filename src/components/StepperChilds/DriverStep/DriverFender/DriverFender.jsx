import React from 'react';
import damage1 from '@images/df.png';

const DriverFender = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Driver Fender</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage1} alt="Driver Fender" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Inspect the driver fender for any signs of damage, such as dents, scratches, or misalignment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverFender;
