import React from 'react';
import vin from '@images/rail.png';

const DriverRoofRail = () => {
    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="d-flex justify-content-center">
                    <h4>
                        Driver Roof <br /> Rail
                    </h4>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={vin} alt="front" />
                </div>
                <div className="fender-text">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverRoofRail;
