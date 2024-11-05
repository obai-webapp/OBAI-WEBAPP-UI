import React, { useState } from 'react';
import car from '@images/car-img.png';
import './VinQualityCheck.scss';
import edit from '@images/edit.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';

const VinQualityCheck = () => {
    const [openCam, setOpenCam] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentStep = searchParams.get('currentStep');
    const currentSubStep = searchParams.get('currentSubStep');

    const handleTakePhoto = () => {
        setOpenCam(false);
    };

    return (
        <div className="vin-quality-check">
            {openCam === false ? (
                <>
                    <div>
                        <h4>Quality Check</h4>
                        <p className="mt-4">Driver Door VIN</p>
                    </div>
                    <div className="ai-img">
                        <img src={car} alt="car" />
                    </div>

                    <div className="scan-section">
                        <h4>Image Scanned</h4>

                        <span className="mt-3">VIN Number</span>

                        <p className="mt-3">1NXBV40E19Z159787</p>

                        <div className="edit-btn mt-3">
                            <img src={edit} alt="edit" />
                            <p>Edit Number</p>
                        </div>
                    </div>
                    <div className="end-button mt-5">
                        <button
                            className="lato-regular without-background mt-3"
                            type="button"
                            onClick={() => {
                                setOpenCam(true);
                            }}
                        >
                            Retake
                        </button>
                        <button
                            className="lato-regular with-background mt-3"
                            type="button"
                            onClick={() => {
                                navigate(
                                    `/super-cool-pictures?currentStep=${Number(currentStep)}&currentSubStep=${Number(currentSubStep) + 1}`
                                );
                            }}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : null}

            {openCam && (
                <div>
                    <Camera
                        isImageMirror={false}
                        idealFacingMode="environment"
                        onTakePhoto={(dataUri) => {
                            handleTakePhoto(dataUri);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default VinQualityCheck;
