import React, { useEffect, useState } from 'react';
import './QualityCheck.scss';
import car from '@images/passenger.jpeg';
import info from '@icons/info.svg';
import backImg from '@icons/back.svg';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import { Col, Row, Form, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    UpdateCapturedImage,
    UpdateSelectedQualityDents,
    UpdateSelectedQualitySizes,
    addAnotherImage
} from '../../redux/cars_images/cars_images_slice';
import edit from '@images/edit.png';
import EditMultipleImageModal from '../../components/Modal/EditMultipleImageModal/EditMultipleImageModal';
import { dentSize, dentsData } from '../../helpers/helpers';
import { formatStringToCaseSensitive, formatStringToLowerCase } from '../../utils/common';

const QualityCheck = ({ pHandleSubmit, pDentInfo, pAddNewImageHandler, pGoBack, pIsShowCloserLook }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const { selectedQualityDents } = useSelector((state) => state.cars_images);
    // const { selectedQualitySizes } = useSelector((state) => state.cars_images);

    console.log({ pDentInfo });

    const { claimID } = useParams();

    const [images, setImages] = useState(pDentInfo?.images?.length ? pDentInfo?.images : []);
    const [dentInfo, setDentInfo] = useState({ dentType: pDentInfo?.dentType, dentSize: pDentInfo?.dentSize });
    const [editImageIndex, setEditImageIndex] = useState(null);

    const [openCam, setOpenCam] = useState(false);
    const [openAnotherCam, setOpenAnotherCam] = useState(false);
    const [error, setError] = useState('');
    const { capturedImages } = useSelector((state) => state.cars_images);
    const [selectedImage, setSelectedImage] = useState(null);

    const [showRetakeModal, setRetakeModal] = useState(false);
    const closeRetakeModal = () => setRetakeModal(false);
    const showRetake = () => setRetakeModal(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentStep = searchParams.get('currentStep');
    const currentSubStep = searchParams.get('currentSubStep');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleTakePhoto = (dataUri) => {
        pAddNewImageHandler(dataUri, editImageIndex);
        // dispatch(UpdateCapturedImage({ index: currentSubStep - 1, dataUri: [dataUri] }));
        setOpenCam(false);
        setEditImageIndex(null);
        setOpenAnotherCam(false);
    };

    const handleReTakePhoto = (dataUri) => {
        pAddNewImageHandler(dataUri, editImageIndex);
        setOpenCam(false);
        setOpenAnotherCam(false);
    };

    const handleTakeAnotherPhoto = (dataUri) => {
        pAddNewImageHandler(dataUri, editImageIndex);
        // dispatch(addAnotherImage({ currentSubStep, dataUri: dataUri }));
        setOpenAnotherCam(false);
        setEditImageIndex(null);
    };

    const tooltip = (content) => (
        <Tooltip id="tooltip">
            <strong></strong> {content}
        </Tooltip>
    );

    const location = useLocation();

    const handleBack = () => {
        navigate(-1);

        if (currentStep + 1 === 1) {
            navigate('/how-it-works');
        }
    };

    const handleSubmit = async () => {
        try {
            if (pIsShowCloserLook) {
                if (!dentInfo?.dentType && !dentInfo?.dentSize) {
                    setError('Select Dent size and quantity');
                    return;
                }
                if (!dentInfo?.dentType) {
                    setError('Select Dent quantity');
                    return;
                }
                if (!dentInfo?.dentSize) {
                    setError('Select Dent size');
                    return;
                }
            }

            setError('');
            pHandleSubmit(dentInfo);
        } catch (error) {}
    };

    return (
        <div className="quality-check">
            <div className={pDentInfo?.images?.length === 1 ? 'for-width single-image' : 'for-width'}>
                {openCam || openAnotherCam ? null : (
                    <>
                        <div className="mt-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <img src={backImg} onClick={pGoBack} alt="back" className="back-image" />
                                <h4>Quality Check</h4>
                            </div>
                            <p className="mt-3 mb-4">{formatStringToCaseSensitive(pDentInfo?.title)}</p>
                        </div>

                        <Row
                            className={
                                pDentInfo?.images?.length > 4
                                    ? 'scrollable-row'
                                    : window.innerWidth <= 768 && pDentInfo?.images?.length > 2
                                      ? 'for-mob-view'
                                      : ''
                            }
                        >
                            {pDentInfo?.images.map((img, dataUriIndex) => (
                                <Col
                                    lg={pDentInfo?.images.length === 1 ? 12 : 6}
                                    xs={12}
                                    sm={pDentInfo?.images.length === 1 ? 12 : 6}
                                    md={pDentInfo?.images.length === 1 ? 12 : 6}
                                >
                                    <div className="ai-img for-edit-img mb-2">
                                        <img src={img || car} alt="Captured" />
                                        <div
                                            className="edit-icon-img"
                                            onClick={() => {
                                                setSelectedImage({ dataUriIndex, img, currentSubStep });
                                                showRetake();
                                                setEditImageIndex(dataUriIndex);
                                            }}
                                        >
                                            <img src={edit} alt="edit" />
                                        </div>
                                    </div>
                                </Col>
                            ))}
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
                                <strong>{formatStringToLowerCase(pDentInfo?.title)}</strong> is visible and clear
                            </p>
                        </div>

                        {pIsShowCloserLook && (
                            <Row className="mt-5 for-radio-active">
                                <h3>A Closer Look</h3>
                                <p className="mt-3  mb-4">
                                    Roughly, how many dents are on the{' '}
                                    <strong>{formatStringToLowerCase(pDentInfo?.title)}</strong>?
                                </p>

                                {dentsData.map((item) => (
                                    <Col lg={12} key={item.id} className="mt-4">
                                        <div
                                            className={
                                                (dentInfo?.dentType === 'NULL' && dentInfo?.dentType === item.value) ||
                                                item?.value === dentInfo?.dentType
                                                    ? 'active-col'
                                                    : 'non-active-col'
                                            }
                                            onClick={() => {
                                                setDentInfo((prev) => ({ ...prev, ['dentType']: item.value }));
                                            }}
                                        >
                                            <Row>
                                                <Col lg={12} className="d-flex align-items-center">
                                                    <Form.Check
                                                        type={'radio'}
                                                        checked={
                                                            (dentInfo?.dentType === 'NULL' &&
                                                                dentInfo?.dentType === item.value) ||
                                                            item.value === dentInfo?.dentType
                                                        }
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={() => {
                                                            setDentInfo((prev) => ({
                                                                ...prev,
                                                                ['dentType']: item.title
                                                            }));
                                                        }}
                                                    />
                                                    <h5 className="ms-3">
                                                        {dentInfo?.dentType === 'NULL' &&
                                                        item.title === dentInfo?.dentType
                                                            ? 'No dents'
                                                            : item.title}
                                                    </h5>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                ))}
                                <div className="mt-5 mb-4">
                                    <p>What is the approximate size of the dent?</p>
                                </div>

                                {dentSize.map((item) => (
                                    <Col lg={12} key={item.id} className="mt-4">
                                        <div
                                            className={
                                                (dentInfo?.dentSize === 'NULL' &&
                                                    dentInfo?.dentSize === item.tooltipContent) ||
                                                item?.title === dentInfo?.dentSize
                                                    ? 'active-col'
                                                    : 'non-active-col'
                                            }
                                            onClick={() => {
                                                setDentInfo((prev) => ({ ...prev, dentSize: item?.title }));
                                            }}
                                        >
                                            <Row className="align-items-center">
                                                <Col
                                                    lg={10}
                                                    md={10}
                                                    sm={10}
                                                    xs={10}
                                                    className="d-flex align-items-center"
                                                >
                                                    <Form.Check
                                                        type={'radio'}
                                                        checked={
                                                            (dentInfo?.dentSize === 'NULL' &&
                                                                dentInfo?.dentSize === item.tooltipContent) ||
                                                            item?.title === dentInfo?.dentSize
                                                        }
                                                        onChange={() =>
                                                            setDentInfo((prev) => ({ ...prev, dentSize: item?.title }))
                                                        }
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <h5 className="ms-3">{item.title}</h5>
                                                </Col>

                                                <Col lg={2} md={2} sm={2} xs={2}>
                                                    <ButtonToolbar>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={tooltip(item.tooltipContent)}
                                                        >
                                                            <img src={info} alt="info" width={'15px'} />
                                                        </OverlayTrigger>
                                                    </ButtonToolbar>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        )}

                        <p className="validation-error mt-5">{error}</p>

                        <div className="end-button mt-5 mb-5">
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
                closeRetakeModal={(imageData) => {
                    handleReTakePhoto(imageData);
                    closeRetakeModal();
                }}
            />
        </div>
    );
};

export default QualityCheck;
