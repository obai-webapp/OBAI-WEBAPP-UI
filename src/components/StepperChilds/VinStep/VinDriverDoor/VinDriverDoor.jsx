import React from 'react';
import vin from '@images/djv.png';

const DoorJamVIN = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Door Jam VIN</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={vin} alt="Door Jam VIN" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Check the VIN located in the door jam area for any signs of damage or wear. Make sure it's visible and intact.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoorJamVIN;
