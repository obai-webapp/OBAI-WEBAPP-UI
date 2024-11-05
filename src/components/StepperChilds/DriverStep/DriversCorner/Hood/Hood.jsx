import React from 'react';
import '../../../StepperMain.scss';
import car from '@images/hood.png';

const Hood = () => {
    return (
        <div className="stepper-main mt-5">
            <div className="for-width">
                <div className="heading-section">
                    <h4 style={{ color: '#333333' }}>Hood</h4> {/* Heading set to black */}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <img src={car} alt="car hood" />
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <p style={{ color: '#333333' }}> {/* Text set to black */}
                        Check the hood for any visible damage or dents.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hood;
