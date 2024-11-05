import React from 'react';
import damage from '@images/sr.png';

const Sunroof = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Sunroof</h4> {/* Heading color updated to #333333 */}
                </div>
                <div className="d-flex justify-content-center mt-3 mb-4 for-damage">
                    <img src={damage} alt="sunroof" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Text color updated to #333333 */}
                        Inspect the sunroof for any cracks, chips, or misalignments. Ensure that the sunroof opens and 
                        closes smoothly and check for any signs of water leakage or malfunctioning seals.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sunroof;
