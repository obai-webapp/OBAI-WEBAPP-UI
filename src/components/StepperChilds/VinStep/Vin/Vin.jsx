import React, { useState } from 'react';

const VinScanner = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [vin, setVin] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle file selection and convert to Base64
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result.split(',')[1];
                console.log('Base64 image data prepared');
                setUploadedImage(base64); // Extract Base64 data
            };
            reader.readAsDataURL(file);
        } else {
            console.warn('No file selected.');
        }
    };

    // Send the image directly to the single endpoint `/ocr-vin`
    const processImage = async (base64Image) => {
        console.log('Sending image to backend for processing...');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicle/ocr-vin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64Image }),
            });

            const data = await response.json();
            console.log('Backend response received:', data);

            if (response.ok && data.vin) {
                console.log('VIN successfully extracted:', data.vin);
                return data.vin;
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
        setVin('');
        if (!uploadedImage) {
            console.warn('No image uploaded.');
            setErrorMessage('No image uploaded. Please upload an image first.');
            return;
        }

        console.log('Starting image processing...');
        setIsProcessing(true);

        try {
            const detectedVin = await processImage(uploadedImage);
            setIsProcessing(false);

            if (detectedVin) {
                const userConfirmed = window.confirm(`Detected VIN: ${detectedVin}. Is this correct?`);
                if (userConfirmed) {
                    console.log(`User confirmed VIN: ${detectedVin}`);
                    setVin(detectedVin);
                } else {
                    console.warn('User did not confirm the VIN.');
                    setErrorMessage('The detected VIN was not confirmed. Please try again.');
                }
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
                {uploadedImage && <p>Image uploaded. Ready to process.</p>}
                <button onClick={startProcessing} disabled={isProcessing || !uploadedImage}>
                    {isProcessing ? 'Processing...' : 'Analyze Image'}
                </button>
            </div>
            {vin && <p style={{ color: 'green' }}>Detected VIN: {vin}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default VinScanner;
