import React from 'react';
import driver from '@images/prr.png';

const PassengerRoofRail = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-5">
                    <h4 style={{ color: '#333333' }}>Passenger Roof Rail</h4> {/* Heading set to #333333 */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={driver} alt="Passenger Roof Rail" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Text set to #333333 */}
                        Carefully inspect the passenger-side roof rail for any signs of damage such as dents or scratches. 
                        Ensure the roof rail is secure and free of misalignments or other structural issues.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassengerRoofRail;
