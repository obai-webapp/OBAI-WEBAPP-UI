import React from 'react';
import damage1 from '@images/dfdoor.png';

const DriverFrontDoor = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Driver Front Door</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage1} alt="Driver Front Door" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Carefully inspect the driver’s front door for any dents, scratches, or other visible damage.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverFrontDoor;
