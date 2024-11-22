import React, { useState } from 'react';

const VinScanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [vinData, setVinData] = useState(null); // Store VIN and additional data
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            setSelectedFile(file);
        } else {
            console.warn('No file selected.');
            setSelectedFile(null);
        }
    };

    // Send the image file to the backend
    const processImage = async (file) => {
        console.log('Sending file to backend for processing...');
        const formData = new FormData();
        formData.append('file', file); // Key must match the backend expectation

        try {
            const response = await fetch('http://localhost:4000/vehicle/ocr-vin', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Backend response received:', data);

            if (response.ok && data.vin) {
                console.log('VIN successfully extracted:', data.vin);
                return data; // Return the entire data object
            } else {
                console.warn('Failed to extract VIN:', data.error || 'Unknown error');
                setErrorMessage(data.error || 'Failed to extract VIN.');
                return null;
            }
        } catch (error) {
            console.error('Error processing image:', error);
            setErrorMessage('Failed to process the image. Please try again.');
            return null;
        }
    };

    // Main function to start processing
    const startProcessing = async () => {
        setErrorMessage('');
        setVinData(null); // Reset previous data
        if (!selectedFile) {
            console.warn('No file selected.');
            setErrorMessage('No file selected. Please upload an image first.');
            return;
        }

        console.log('Starting image processing...');
        setIsProcessing(true);

        try {
            const detectedVinData = await processImage(selectedFile);
            setIsProcessing(false);

            if (detectedVinData) {
                console.log('Full VIN data received:', detectedVinData);
                setVinData(detectedVinData); // Directly set the VIN data without confirmation
            } else {
                console.warn('VIN extraction failed.');
                setErrorMessage('VIN extraction failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during processing:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h1>VIN Scanner</h1>
            <div style={{ margin: '20px 0' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                />
                {selectedFile && <p>File selected: {selectedFile.name}</p>}
                <button onClick={startProcessing} disabled={isProcessing || !selectedFile}>
                    {isProcessing ? 'Processing...' : 'Analyze Image'}
                </button>
            </div>
            {vinData && (
                <div style={{ color: 'green' }}>
                    <h2>VIN Details:</h2>
                    <p>VIN: {vinData.vin}</p>
                    <p>Make: {vinData.make}</p>
                    <p>Model: {vinData.model}</p>
                    <p>Year: {vinData.year}</p>
                    <p>Message: {vinData.message}</p>
                </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default VinScanner;
