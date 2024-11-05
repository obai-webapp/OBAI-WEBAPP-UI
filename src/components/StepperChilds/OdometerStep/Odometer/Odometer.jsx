import React from 'react';
import meter from '@images/odo.png';

const Odometer = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <h4 className="heading-section mt-5" style={{ color: '#333333' }}>Odometer</h4> {/* Updated text color */}
                <div className="d-flex justify-content-center mt-4">
                    <img src={meter} alt="Odometer" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>

                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Please check the odometer for accurate readings and ensure it’s properly functioning. Make sure the numbers are visible and clear.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Odometer;
