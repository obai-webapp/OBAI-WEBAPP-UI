import React, { useState } from 'react';
import vin from '@images/dv.png';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const DashboardVin = () => {
    const [isScanning, setIsScanning] = useState(false);

    const handleScanVIN = () => {
        setIsScanning(true);
    };

    const handleTakePhoto = async (dataUri) => {
        setIsScanning(false);
        console.log("Captured VIN image:", dataUri);
    };

    return (
        <div className="stepper-main">
            <div className="for-width">
                <div className="heading-section mt-4 mt-5">
                    <h4 style={{ color: '#333333' }}>Dashboard VIN</h4>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-4 for-damage">
                    <img src={vin} alt="Dashboard VIN" />
                </div>
                <div className="fender-text mt-5">
                    <p style={{ color: '#333333' }}>
                        Ensure the Vehicle Identification Number (VIN) on the dashboard is clearly visible and undamaged.
                    </p>
                </div>
                <div className="mt-5 w-full d-flex justify-content-center">
                    <button
                        className="btn"
                        style={{
                            backgroundColor: '#FF8C00',
                            color: '#FFFFFF',
                            padding: '12px 25px',
                            borderRadius: '25px',
                            border: 'none',
                            width: '200px', // Increased width
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                        }}
                        onClick={handleScanVIN}
                    >
                        Scan VIN
                    </button>
                </div>
                {isScanning && (
                    <div className="camera-div mt-4">
                        <Camera
                            isImageMirror={false}
                            idealFacingMode="environment"
                            onTakePhoto={handleTakePhoto}
                        />
                        <button
                            className="btn mt-3"
                            style={{
                                backgroundColor: '#6c757d',
                                color: '#FFFFFF',
                                padding: '12px 25px',
                                borderRadius: '25px',
                                border: 'none',
                                width: '400px', // Matched width to "Scan VIN" button
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                            }}
                            onClick={() => setIsScanning(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardVin;
