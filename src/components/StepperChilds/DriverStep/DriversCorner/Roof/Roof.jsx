import React from 'react';
import front from '@images/roof-only.png';

const Roof = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Roof</h4> {/* Heading set to #333333 */}
                </div>
                <div className="d-flex justify-content-center mt-3 mb-4 for-damage">
                    <img src={front} alt="car roof" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Text set to #333333 */}
                        Inspect the car's roof carefully for any signs of damage. Check for dents, scratches, or areas 
                        where the paint might have been chipped off. Make sure the roof is structurally intact and free 
                        from any major issues.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Roof;
