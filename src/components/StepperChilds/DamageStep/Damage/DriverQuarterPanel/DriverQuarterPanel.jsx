import React from 'react';
import damage from '@images/dqp.png';

const DriverQuarterPanel = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Driver Quarter Panel</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage} alt="Driver Quarter Panel" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Inspect the driver-side quarter panel for any visible damage, including dents or scratches. Focus on the edges and wheel arch area.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverQuarterPanel;
