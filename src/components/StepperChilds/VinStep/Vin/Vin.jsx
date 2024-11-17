import React, { useState } from 'react';

const VinScanner = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [vin, setVin] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target.result.split(',')[1]); // Extract Base64 data
            };
            reader.readAsDataURL(file);
        }
    };

    const detectVIN = async (base64Image) => {
        try {
            console.log('Sending image to backend for VIN extraction...');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicle/ocr-vin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: base64Image }),
            });
            const data = await response.json();

            if (response.ok && data.vin) {
                console.log('VIN successfully extracted from backend:', data.vin);
                return data.vin;
            } else {
                console.warn('Backend error or no VIN detected:', data.error || 'No VIN detected');
                return null;
            }
        } catch (error) {
            console.error('Error sending image to backend:', error);
            return null;
        }
    };

    const fetchVinData = async (vin) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicle/fetch-vin-data/${vin}`);
            const vinData = await response.json();
            console.log('VIN Data:', vinData);
            if (response.ok) {
                alert(`Vehicle Details:\n${JSON.stringify(vinData.data, null, 2)}`);
            } else {
                alert('Error retrieving VIN details. Try again.');
            }
        } catch (error) {
            console.error('Error fetching VIN data:', error);
            alert('Error fetching VIN data. Please try again.');
        }
    };

    const startProcessing = async () => {
        setErrorMessage('');
        setVin('');
        if (!uploadedImage) {
            setErrorMessage('No image uploaded. Please upload an image first.');
            return;
        }

        setIsProcessing(true);
        try {
            const detectedVin = await detectVIN(uploadedImage);
            setIsProcessing(false);

            if (detectedVin) {
                const userConfirmed = window.confirm(`Detected VIN: ${detectedVin}. Is this correct?`);
                if (userConfirmed) {
                    setVin(detectedVin);
                    console.log(`VIN Confirmed: ${detectedVin}`);
                    await fetchVinData(detectedVin);
                } else {
                    setErrorMessage('The detected VIN was not confirmed. Please try again.');
                }
            } else {
                setErrorMessage("Kameron didn't figure this out yet.");
            }
        } catch (error) {
            console.error('Error processing the image:', error);
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
