import React, { useState } from 'react';
import VIN from "./../../../../assets/images/Finding your vehicles VIN - Obai.svg";

const VinScanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [vinData, setVinData] = useState(null); // Store VIN and additional data
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    // Send the image file to the backend
    const processImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file); // Key must match the backend expectation

        try {
            const response = await fetch('http://localhost:4000/vehicle/ocr-vin', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.vin) {
                return data; // Return the entire data object
            } else {
                setErrorMessage(data.error || 'Failed to extract VIN.');
                return null;
            }
        } catch (error) {
            setErrorMessage('Failed to process the image. Please try again.');
            return null;
        }
    };

    // Main function to start processing
    const startProcessing = async () => {
        setErrorMessage('');
        setVinData(null); // Reset previous data
        if (!selectedFile) {
            setErrorMessage('No file selected. Please upload an image first.');
            return;
        }

        setIsProcessing(true);

        try {
            const detectedVinData = await processImage(selectedFile);
            setIsProcessing(false);

            if (detectedVinData) {
                setVinData(detectedVinData); // Directly set the VIN data without confirmation
            } else {
                setErrorMessage('VIN extraction failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            {/* VIN Scanner Title */}
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                VIN Scanner
            </h1>

            {/* Image Section */}
            <div>
                <img
                    src={VIN}
                    alt="Illustration of finding a vehicle's VIN"
                    style={{ width: '100%', height: 'auto', maxHeight: '200px', margin: '20px 0', objectFit: 'contain' }}
                />
            </div>

            {/* File Upload and Analyze Button */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                    aria-label="Upload VIN image"
                    style={{
                        display: 'block',
                        margin: '10px auto',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid #d4d4d4',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                    }}
                />
                <button
                    onClick={startProcessing}
                    disabled={isProcessing || !selectedFile}
                    style={{
                        backgroundColor: isProcessing || !selectedFile ? '#E0E0E0' : '#FF8C00', // Adjust colors to match your scheme
                        color: isProcessing || !selectedFile ? '#A0A0A0' : '#FFF',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: isProcessing || !selectedFile ? 'not-allowed' : 'pointer',
                        marginTop: '20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                    aria-label="Analyze VIN image"
                    onMouseOver={(e) => {
                        if (!isProcessing && selectedFile) {
                            e.target.style.backgroundColor = '#E67E00';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isProcessing && selectedFile) {
                            e.target.style.backgroundColor = '#FF8C00';
                        }
                    }}
                >
                    {isProcessing ? 'Processing...' : 'Analyze Image'}
                </button>
            </div>

            {/* VIN Data Section */}
            {vinData && (
                <div style={{ color: '#28A745', marginTop: '20px', textAlign: 'center', border: '1px solid #d4d4d4', padding: '20px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>VIN Details:</h2>
                    <p><strong>VIN:</strong> {vinData.vin}</p>
                    <p><strong>Make:</strong> {vinData.make}</p>
                    <p><strong>Model:</strong> {vinData.model}</p>
                    <p><strong>Year:</strong> {vinData.year}</p>
                    <p><strong>Message:</strong> {vinData.message}</p>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && <p style={{ color: '#E63946', marginTop: '20px' }}>{errorMessage}</p>}
        </div>
    );
};

export default VinScanner;
