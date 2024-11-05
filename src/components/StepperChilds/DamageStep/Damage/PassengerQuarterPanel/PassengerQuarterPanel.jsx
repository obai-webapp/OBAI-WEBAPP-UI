import React from 'react';
import damage from '@images/pqp.png';

const PassengerQuarterPanel = () => {
    return (
        <div className="stepper-main">
            <div className="for-width-quarter">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Passenger Quarter Panel</h4>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={damage} alt="Passenger Quarter Panel" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}>
                        Inspect for dents or scratches near the wheel arch.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassengerQuarterPanel;
