import React, { useEffect, useState } from 'react';
import './OdometerQualityCheck.scss';
import car from '@images/passenger.jpeg';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCapturedImage, addAnotherImage } from '../../../../redux/cars_images/cars_images_slice';
import EditMultipleImageModal from '../../../Modal/EditMultipleImageModal/EditMultipleImageModal';

const OdometerQualityCheck = (props) => {
    const [openCam, setOpenCam] = useState(false);
    const [openAnotherCam, setOpenAnotherCam] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { claimID } = useParams();
    const { capturedImages } = useSelector((state) => state.cars_images);
    const [selectedImage, setSelectedImage] = useState(null);

    const [showRetakeModal, setRetakeModal] = useState(false);
    const closeRetakeModal = () => setRetakeModal(false);
    const showRetake = () => setRetakeModal(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentStep = searchParams.get('currentStep');
    const currentSubStep = searchParams.get('currentSubStep');

    const stepsComponents = [
        {
            id: 1,
            name: 'DriverStep',
            children: [
                {
                    id: '2',
                    name: 'Hood'
                },

                {
                    id: '3',
                    name: 'Passenger Fender'
                },
                {
                    id: '4',
                    name: 'Cowl'
                },
                {
                    id: '5',
                    name: 'Passenger Front Door'
                },
                {
                    id: '6',
                    name: 'Passenger Roof Rail'
                },
                {
                    id: '7',
                    name: 'Roof'
                },
                {
                    id: '9',
                    name: 'Sunroof'
                },
                {
                    id: '10',
                    name: 'Passenger Rear Door'
                },
                {
                    id: '11',
                    name: 'Passenger Quarter Panel'
                },
                {
                    id: '12',
                    name: 'Deck Lid / Gate'
                },
                {
                    id: '13',
                    name: 'Driver Quarter Panel'
                },
                {
                    id: '14',
                    name: 'Driver Rear Door'
                },
                {
                    id: '16',
                    name: 'Driver Roof Rail'
                },
                {
                    id: '17',
                    name: 'Driver Front Door'
                },
                {
                    id: '18',
                    name: 'Driver Fender'
                },
                {
                    id: '19',
                    name: 'Dashboard VIN'
                },
                {
                    id: '20',
                    name: 'Door Jam VIN'
                },

                {
                    id: '21',
                    name: 'Vin Review'
                },
                {
                    id: '23',
                    name: 'Odometer'
                },
                {
                    id: '24',
                    name: 'Odometer Review'
                },
                {
                    id: 25,
                    name: 'ReviewAndSubmit'
                }
            ]
        },
        {
            id: 25,
            name: 'ReviewAndSubmit'
        }
    ];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleTakePhoto = (dataUri) => {
        dispatch(UpdateCapturedImage({ index: currentSubStep - 1, dataUri: [dataUri] }));
        setOpenCam(false);
    };
    const handleTakeAnotherPhoto = (dataUri) => {
        dispatch(
            addAnotherImage({
                currentSubStep: Number(currentSubStep) === 19 ? 18 : Number(currentSubStep),
                dataUri: dataUri
            })
        );
        setOpenAnotherCam(false);
    };

    const handleBack = () => {
        navigate(-1);
        if (currentStep + 1 === 1) {
            navigate(`/${claimID}/how-it-works`);
        }
    };

    const handleSubmit = async () => {
        try {
            navigate(
                `/${claimID}/super-cool-pictures?currentStep=${Number(currentStep)}&currentSubStep=${Number(currentSubStep) + 1}`
            );
        } catch (error) {}
    };

    return (
        <div className="odometer-quality-check">
            <div
                className={
                    capturedImages[Number(currentSubStep) === 19 ? 17 : currentSubStep - 1]?.dataUri?.length === 1
                        ? 'for-width single-image'
                        : 'for-width'
                }
            >
                {openCam || openAnotherCam ? null : (
                    <>
                        <div className="mt-3">
                            <h4>Quality Check</h4>
                            <p className="mt-3 mb-4">
                                {stepsComponents[0].children[currentSubStep === 1 ? 0 : currentSubStep - 1].name}
                            </p>
                        </div>

                        <Row
                            className={
                                capturedImages[Number(currentSubStep) === 19 ? 17 : currentSubStep - 1]?.dataUri
                                    ?.length > 4
                                    ? 'scrollable-row'
                                    : window.innerWidth <= 768 &&
                                        capturedImages[Number(currentSubStep) === 19 ? 17 : currentSubStep - 1]?.dataUri
                                            ?.length > 2
                                      ? 'for-mob-view'
                                      : ''
                            }
                        >
                            {capturedImages[Number(currentSubStep) === 19 ? 17 : currentSubStep - 1]?.dataUri?.map(
                                (img, dataUriIndex) => (
                                    <Col
                                        lg={
                                            capturedImages[Number(currentSubStep) === 19 ? 17 : currentSubStep - 1]
                                                ?.dataUri?.length === 1
                                                ? 12
                                                : 6
                                        }
                                        xs={12}
                                        sm={capturedImages[currentSubStep - 1]?.dataUri?.length === 1 ? 12 : 6}
                                        md={capturedImages[currentSubStep - 1]?.dataUri?.length === 1 ? 12 : 6}
                                    >
                                        <div
                                            className="ai-img mb-2"
                                            onClick={() => {
                                                setSelectedImage({
                                                    dataUriIndex,
                                                    img,
                                                    currentSubStep:
                                                        Number(currentSubStep) === 19 ? 18 : Number(currentSubStep)
                                                });
                                                showRetake();
                                            }}
                                        >
                                            <img src={img || car} alt="Captured" />
                                        </div>
                                    </Col>
                                )
                            )}
                        </Row>

                        <div
                            className="add-another mt-2"
                            onClick={() => {
                                setOpenAnotherCam(true);
                            }}
                        >
                            <h6>Add Another Image</h6>
                        </div>

                        <div className="double-check mt-4">
                            <h4>Double Check</h4>
                            <p className="mb-4">
                                Please double check your picture <br /> and make sure the entire{' '}
                                <strong>
                                    {stepsComponents[0].children[currentSubStep === 1 ? 0 : currentSubStep - 1].name}
                                </strong>{' '}
                                is visible and clear
                            </p>
                        </div>

                        <div className="end-button mt-5 mb-5">
                            <button className="without-background mt-3" type="button" onClick={handleBack}>
                                Back
                            </button>
                            <button className="with-background mt-3" type="button" onClick={handleSubmit}>
                                Next
                            </button>
                        </div>
                    </>
                )}

                {openCam && (
                    <div className="camera-div">
                        <Camera
                            isImageMirror={false}
                            idealFacingMode="environment"
                            onTakePhoto={(dataUri) => {
                                handleTakePhoto(dataUri);
                            }}
                        />
                    </div>
                )}
                {openAnotherCam && (
                    <div className="camera-div">
                        <Camera
                            isImageMirror={false}
                            idealFacingMode="environment"
                            onTakePhoto={(dataUri) => {
                                handleTakeAnotherPhoto(dataUri);
                            }}
                        />
                    </div>
                )}
            </div>

            <EditMultipleImageModal
                selectedImage={selectedImage}
                showRetakeModal={showRetakeModal}
                closeRetakeModal={closeRetakeModal}
            />
        </div>
    );
};

export default OdometerQualityCheck;
