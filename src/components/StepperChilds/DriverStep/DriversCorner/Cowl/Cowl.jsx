import React from 'react';
import passenger from '@images/cowl-p.png';

const Cowl = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Cowl</h4> {/* Updated heading color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={passenger} alt="passenger" />
                </div>
                <div className="fender-text d-flex justify-content-center align-items-center mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated meaningful text */}
                        Please check the cowl for any visible damage or misalignment. Ensure that the photo captures the 
                        entire section clearly before proceeding to the next step.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cowl;
