import React from 'react';
import vin from '@images/dv.png';

const DashboardVin = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-4 mt-5">
                    <h4 style={{ color: '#333333' }}>Dashboard VIN</h4> {/* Updated text color */}
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={vin} alt="Dashboard VIN" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}> {/* Updated text color */}
                        Ensure the Vehicle Identification Number (VIN) on the dashboard is clearly visible and undamaged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardVin;
