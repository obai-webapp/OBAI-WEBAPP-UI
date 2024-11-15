import React, { useState, useEffect, useRef } from 'react';
import vin from '@images/dv.png';
import Quagga from 'quagga'; // Import QuaggaJS

const DashboardVin = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [vinResult, setVinResult] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const scannerRef = useRef(null);

    const handleScanVIN = () => {
        setIsScanning(true);
        startQuagga();
    };

    const startQuagga = () => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerRef.current,
                constraints: {
                    facingMode: "environment" // Use back camera
                }
            },
            decoder: {
                readers: ["code_128_reader", "code_39_reader"] // Common VIN barcode formats
            }
        }, (err) => {
            if (err) {
                console.error("Quagga init error:", err);
                return;
            }
            Quagga.start();
        });

        // Listen for successful barcode detection
        Quagga.onDetected(handleDetected);
    };

    const handleDetected = (result) => {
        const detectedVIN = result.codeResult.code;
        if (detectedVIN.length === 17) { // VINs are always 17 characters
            setVinResult(detectedVIN);
            stopQuagga();
        } else {
            handleFailedAttempt();
        }
    };

    const handleFailedAttempt = () => {
        setAttempts((prevAttempts) => prevAttempts + 1);
        if (attempts + 1 >= maxAttempts) {
            stopQuagga();
            setIsScanning(false);
            alert("Could not scan the VIN. Please enter it manually.");
        }
    };

    const stopQuagga = () => {
        Quagga.offDetected(handleDetected);
        Quagga.stop();
    };

    const submitVIN = () => {
        // Logic to send the `vinResult` to the backend
        fetch(`/vehicle/specifications/${vinResult}`)
            .then(response => response.json())
            .then(data => {
                console.log("VIN data:", data);
                // Handle the data received from backend
            })
            .catch(err => {
                console.error("Error fetching VIN data:", err);
            });
    };

    // Stop Quagga when component unmounts
    useEffect(() => {
        return () => {
            if (isScanning) {
                stopQuagga();
            }
        };
    }, [isScanning]);

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
                            width: '200px',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                        }}
                        onClick={handleScanVIN}
                    >
                        Scan VIN
                    </button>
                </div>

                {isScanning && (
                    <div className="camera-div mt-4" ref={scannerRef} style={{ width: "100%", height: "400px" }}>
                        <button
                            className="btn mt-3"
                            style={{
                                backgroundColor: '#6c757d',
                                color: '#FFFFFF',
                                padding: '12px 25px',
                                borderRadius: '25px',
                                border: 'none',
                                width: '400px',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setIsScanning(false);
                                stopQuagga();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {vinResult && (
                    <div className="result mt-4">
                        <p>Detected VIN: {vinResult}</p>
                        <button
                            className="btn"
                            style={{
                                backgroundColor: '#28a745',
                                color: '#FFFFFF',
                                padding: '12px 25px',
                                borderRadius: '25px',
                                border: 'none',
                                width: '200px',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                            }}
                            onClick={submitVIN}
                        >
                            Submit VIN
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardVin;
