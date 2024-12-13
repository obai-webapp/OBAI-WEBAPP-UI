import React, { useState, useRef } from 'react';
import VIN from "./../../../../assets/images/Finding your vehicles VIN - Obai.svg";

const VinScanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [vinData, setVinData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setCapturedImage(null); // Clear camera capture if a file is uploaded
        } else {
            setSelectedFile(null);
        }
    };

    const processImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:4000/vehicle/ocr-vin', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.vin) {
                return data;
            } else {
                setErrorMessage(data.error || 'Failed to extract VIN.');
                return null;
            }
        } catch (error) {
            setErrorMessage('Failed to process the image. Please try again.');
            return null;
        }
    };

    const startProcessing = async () => {
        setErrorMessage('');
        setVinData(null);

        if (!selectedFile && !capturedImage) {
            setErrorMessage('No file selected. Please upload or capture an image first.');
            return;
        }

        setIsProcessing(true);

        try {
            const detectedVinData = await processImage(selectedFile || capturedImage);
            setIsProcessing(false);

            if (
                detectedVinData &&
                detectedVinData.make &&
                detectedVinData.model &&
                detectedVinData.year
            ) {
                setVinData(detectedVinData);
            } else {
                setErrorMessage('Unable to extract complete VIN details. Please upload a clearer image.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    const handleTakePicture = () => {
        setIsCameraActive(true);
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            })
            .then((stream) => {
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch(() => {
                setErrorMessage('Unable to access camera. Please try again.');
            });
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.srcObject.getTracks().forEach((track) => track.stop()); // Stop the camera

            canvas.toBlob((blob) => {
                const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
                setCapturedImage(file);
                setSelectedFile(null); // Clear uploaded file if an image is captured
                setIsCameraActive(false);
            });
        }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            textAlign: 'center',
            padding: '20px',
            maxWidth: '600px',
            margin: '20px auto',
        }}>
            <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#FF8C00'
            }}>Dashboard VIN</h1>

            {!capturedImage && !selectedFile && !isCameraActive && !vinData && (
                <div>
                    <img
                        src={VIN}
                        alt="Illustration of finding a vehicle's VIN"
                        style={{
                            width: '100%',
                            maxHeight: '200px',
                            marginBottom: '20px',
                            borderRadius: '10px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            )}

            {(capturedImage || selectedFile) && (
                <div style={{ marginBottom: '20px' }}>
                    <img
                        src={capturedImage ? URL.createObjectURL(capturedImage) : URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        style={{
                            width: '100%',
                            maxHeight: '200px',
                            marginBottom: '20px',
                            borderRadius: '10px',
                            objectFit: 'contain',
                            border: '1px solid #d4d4d4',
                        }}
                    />
                </div>
            )}

            {!isCameraActive && !vinData && (
                <div>
                    <button
                        onClick={handleTakePicture}
                        style={{
                            backgroundColor: '#FF8C00',
                            color: '#FFF',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            maxWidth: '280px',
                            width: '100%',
                            margin: '10px auto',
                        }}
                    >
                        Take Picture
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isProcessing}
                        style={{
                            display: 'block',
                            maxWidth: '280px',
                            width: '100%',
                            margin: '10px auto',
                            padding: '10px',
                            borderRadius: '50px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #d4d4d4',
                            color: '#333',
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                        }}
                    />

                    <button
                        onClick={startProcessing}
                        disabled={isProcessing || (!selectedFile && !capturedImage)}
                        style={{
                            backgroundColor: isProcessing || (!selectedFile && !capturedImage) ? '#E0E0E0' : '#FF8C00',
                            color: isProcessing || (!selectedFile && !capturedImage) ? '#888' : '#FFF',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            cursor: isProcessing || (!selectedFile && !capturedImage) ? 'not-allowed' : 'pointer',
                            maxWidth: '280px',
                            width: '100%',
                            margin: '10px auto',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {isProcessing ? 'Processing...' : 'Analyze Image'}
                    </button>
                </div>
            )}

            {isCameraActive && (
                <div style={{ marginBottom: '20px' }}>
                    <video ref={videoRef} style={{ width: '100%', height: '100vh', objectFit: 'cover' }}></video>
                    <button
                        onClick={captureImage}
                        style={{
                            backgroundColor: '#FF8C00',
                            color: '#FFF',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        Capture Image
                    </button>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {vinData && (
                <div style={{
                    color: '#333',
                    marginTop: '20px',
                    textAlign: 'center',
                    border: '1px solid #e0e0e0',
                    padding: '20px',
                    borderRadius: '5px',
                    backgroundColor: '#FFFFFF',
                    width: '50%',
                    margin: '20px auto',
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: '#FF8C00'
                    }}>VIN Details</h2>
                    <p><strong>VIN:</strong> {vinData.vin}</p>
                    <p><strong>Make:</strong> {vinData.make}</p>
                    <p><strong>Model:</strong> {vinData.model}</p>
                    <p><strong>Year:</strong> {vinData.year}</p>
                    <p><strong>Message:</strong> {vinData.message}</p>
                </div>
            )}

            {errorMessage && (
                <div style={{
                    color: '#E63946',
                    marginTop: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: '10px',
                    border: '1px solid #e63946',
                    borderRadius: '5px',
                    backgroundColor: '#FFEEEE',
                    width: '50%',
                    margin: '20px auto',
                }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default VinScanner;
