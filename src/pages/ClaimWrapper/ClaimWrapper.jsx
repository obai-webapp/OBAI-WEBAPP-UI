import React, { Children, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axiosWrapper from '../../utils/api';
import { Container, Spinner } from 'react-bootstrap';
import { base64ToBlob, dentSize, dummyData, getDamageInfo, screenList, showLoader } from '../../helpers/helpers';
import WelcomeScreen from '@pages/WelcomeScreen/WelcomeScreen';
import Hood from '../../components/StepperChilds/DriverStep/DriversCorner/Hood/Hood';
import HowItWorks from '../HowItWorks/HowItWorks';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './claimWrapper.scss';
import QualityCheck from '../QualityCheck/QualityCheck';
import PassengerFender from '../../components/StepperChilds/DriverStep/DriversCorner/PassengerFender/PassengerFender';
import Cowl from '../../components/StepperChilds/DriverStep/DriversCorner/Cowl/Cowl';
import PassengerFrontDoor from '../../components/StepperChilds/DriverStep/DriversCorner/PassengerRearCorner/PassengerRearCorner';
import PassengerRoofRail from '../../components/StepperChilds/DriverStep/DriversCorner/PassengerRoofRail/PassengerRoofRail';
import Roof from '../../components/StepperChilds/DriverStep/DriversCorner/Roof/Roof';
import Sunroof from '../../components/StepperChilds/DamageStep/Damage/Sunroof/Sunroof';
import PassengerRearDoor from '../../components/StepperChilds/DamageStep/Damage/PassengerRearDoor/PassengerRearDoor';
import PassengerQuarterPanel from '../../components/StepperChilds/DamageStep/Damage/PassengerQuarterPanel/PassengerQuarterPanel';
import DeckLidGate from '../../components/StepperChilds/DamageStep/Damage/DeckLidGate/DeckLidGate';
import DriverQuarterPanel from '../../components/StepperChilds/DamageStep/Damage/DriverQuarterPanel/DriverQuarterPanel';
import DriverRearDoor from '../../components/StepperChilds/DamageStep/Damage/DriverRearDoor/DriverRearDoor';
import DriverRoofRail from '../../components/StepperChilds/DriverStep/DriversCorner/DriverRoofRail/DriverRoofRail';
import DriverFrontDoor from '../../components/StepperChilds/DriverStep/DriverFrontDoor/DriverFrontDoor';
import DriverFender from '../../components/StepperChilds/DriverStep/DriverFender/DriverFender';
import DashboardVin from '../../components/StepperChilds/VinStep/Vin/Vin';
import DoorJamVIN from '../../components/StepperChilds/VinStep/VinDriverDoor/VinDriverDoor';
import VinReview from '../../components/StepperChilds/VinStep/VinReview/VinReview';
import Odometer from '../../components/StepperChilds/OdometerStep/Odometer/Odometer';
import OdometerReview from '../../components/StepperChilds/OdometerStep/OdometerReview/OdometerStep';
import ReviewAndSubmit from '../../components/StepperChilds/ReviewAndSubmit/ReviewAndSubmit';
import ClaimSubmitted from '../ClaimSubmitted/ClaimSubmitted';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ClaimWrapper = (props) => {
    const { claimID } = useParams();
    const imageUploadRef = useRef(null);

    const [isClaimExist, setIsClaimExist] = useState(true);
    const [claim, setClaim] = useState({});
    const [activeStep, setActiveStep] = useState(0); // 0
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [dentsInfoList, setDentsInfoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isQualityCheck = useMemo(
        () => (dentsInfoList?.length ? dentsInfoList.some((el) => el.isCheckQuality) : false),
        [dentsInfoList]
    );

    const getIndex = useMemo(() => screenList.findIndex((el) => el.stepNo === activeStep), [activeStep]);

    const singleStepDetail = useMemo(
        () =>
            dentsInfoList?.length ? dentsInfoList.find((el) => el.title === screenList[activeStep]?.screenName) : null,
        [dentsInfoList]
    );

    const updateExistingItem = (data, index) => {
        const [...rest] = dentsInfoList;
        rest[index] = { ...rest[index], ...data };
        return rest;
    };

    const addNewItem = (data) => {
        const [...rest] = dentsInfoList;
        rest.push({ ...rest[getIndex], ...data });
        return rest;
    };

    const getActiveStepInfo = (images) => {
        const screenInfo = screenList.find((el) => el.stepNo === activeStep);

        const dentObj = {
            title: screenInfo?.screenName || screenInfo?.screen,
            step: screenInfo?.stepNo - 2,
            images,
            isCheckQuality: ['VinReview', 'OdometerReview'].includes(screenInfo?.screenName || screenInfo?.screen)
                ? false
                : true
        };

        return dentObj;
    };

    const fetchInitialData = async () => {
        if (claimID === 'admin-login') return;

        setIsLoading(true);
        try {
            const { data } = await axiosWrapper('get', `${import.meta.env.VITE_API_URL}/api/claim/${claimID}`);
            setClaim(data);

            if (data.status !== 'PENDING') setActiveStep(screenList?.length);
        } catch (error) {
            setIsClaimExist(false);
            setClaim({});
        } finally {
            setIsLoading(false);
        }
    };

    const handleTakePhoto = async (dataUri) => {
        setIsCameraOpen(false);
        showLoader(true);
        window.scroll(0, 0);

        const toastID = toast.loading('Analyzing image');

        try {
            const formData = new FormData();
            const blob = base64ToBlob(dataUri);
            formData.append('files', blob, 'image.jpg');

            const { data: respData } = await axiosWrapper(
                'post',
                `${import.meta.env.VITE_API_URL}/api/user/vision/api`,
                { imageBase64: dataUri.split('base64,')[1] },
                false,
                false
            );

            if (!String(respData).includes('isCar')) {
                toast.update(toastID, {
                    render: 'Image processing failed. Try again.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000
                });
                return;
            }

            const result = JSON.parse(
                respData.replaceAll('```json\n', '').replaceAll('\n```', '').replaceAll('```', '')
            );

            const { isCar, isDamage, dentSize, numberOfDents } = result;

            if (!isCar) throw 'Provided image is not a car';

            const carDamageInfo = getDamageInfo(dentSize, numberOfDents);

            const { data } = await axiosWrapper(
                'post',
                `${import.meta.env.VITE_API_URL}/api/media/upload`,
                formData,
                false,
                true
            );

            const images = data?.length
                ? data.reduce((a, b) => {
                    a = [...a, b.path];
                    return a;
                }, [])
                : [];

            const [...rest] = dentsInfoList;

            const isIndexExist = rest?.length
                ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName)
                : -1;

            const newData = getActiveStepInfo(images);
            let newDentList = [];

            if (isIndexExist > -1) {
                newDentList = updateExistingItem({ ...newData, ...carDamageInfo }, isIndexExist);
            } else {
                newDentList = addNewItem({ ...newData, ...carDamageInfo });
                // newDentList = addNewItem(newData);
            }

            setDentsInfoList(newDentList);

            toast.update(toastID, {
                render: 'Image analyzed successfully',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
        } catch (error) {
            toast.update(toastID, { render: error, type: 'error', isLoading: false, autoClose: 3000 });
        } finally {
            showLoader(false);
        }
    };

    const addNewImageHandler = async (dataUri, imageIndex) => {
        try {
            showLoader(true);
            window.scroll(0, 0);
            const formData = new FormData();
            const blob = base64ToBlob(dataUri);
            formData.append('files', blob, 'image.jpg');

            const { data } = await axiosWrapper(
                'post',
                `${import.meta.env.VITE_API_URL}/api/media/upload`,
                formData,
                false,
                true
            );

            const images = data?.length
                ? data.reduce((a, b) => {
                    a = [...a, b.path];
                    return a;
                }, [])
                : [];

            const [...rest] = dentsInfoList;

            const isIndexExist = rest?.length
                ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName)
                : -1;

            if (isIndexExist > -1) {
                if (imageIndex == null) rest[isIndexExist].images = [...rest[isIndexExist].images, ...images];
                else rest[isIndexExist].images[imageIndex] = images?.length ? images[0] : '';
                setDentsInfoList(rest);
            }
        } catch (error) {
            console.log({ error });
        } finally {
            showLoader(false);
        }
    };

    const handleSubmit = (data) => {
        const [...rest] = dentsInfoList;

        const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName) : -1;

        if (isIndexExist > -1) {
            rest[isIndexExist] = { ...rest[isIndexExist], isCheckQuality: false, ...data };
            setActiveStep(getIndex + 1);
            setDentsInfoList(rest);
        }
    };

    const skipStep = () => {
        const [...rest] = dentsInfoList;

        const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName) : -1;

        if (isIndexExist > -1) {
            rest[isIndexExist] = {
                ...rest[isIndexExist],
                isCheckQuality: false,
                dentSize: '',
                dentType: '',
                images: []
            };
        } else {
            const screenInfo = screenList.find((el) => el.stepNo === activeStep);

            rest.push({
                title: screenInfo?.screenName,
                step: screenInfo?.stepNo - 2,
                isCheckQuality: false,
                dentSize: '',
                dentType: '',
                images: []
            });
        }
        setDentsInfoList(rest);
        setActiveStep(getIndex + 1);
    };

    const goBack = () => {
        if (activeStep > 2) {
            const [...rest] = dentsInfoList;

            const screens = ['VinReview', 'OdometerReview'];

            const isIndexExist = rest?.length
                ? rest.findIndex((el) => el.title === screenList[getIndex - 1]?.screenName)
                : -1;

            rest[isIndexExist].isCheckQuality = !screens.includes(rest[isIndexExist].title);

            setDentsInfoList(rest);
        }

        setActiveStep(getIndex - 1);
    };

    const goBackOneStep = () => {
        const [...rest] = dentsInfoList;

        const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName) : -1;

        rest[isIndexExist].isCheckQuality = false;

        setDentsInfoList(rest);
    };

    const vinReviewHandler = (key, data) => {
        const [...rest] = dentsInfoList;

        const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName) : -1;

        if (isIndexExist > -1) {
            if (key === 'doorJamVinImages') {
                rest[isIndexExist].doorJamVinImages.push(data[0]);
            } else if (key === 'dashboardVinImages') {
                rest[isIndexExist].dashboardVinImages.push(data[0]);
            } else if (key === 'vinNumber') {
                rest[isIndexExist].vinNumber = data;
            }
        } else {
            const newData = {
                ...getActiveStepInfo([]),
                doorJamVinImages: [],
                dashboardVinImages: [],
                vinNumber: '',
                dentType: '',
                dentSize: ''
            };
            rest.push({ ...newData, [key]: data });
        }

        setDentsInfoList(rest);
    };

    const vinReviewEditImageHandler = async (dataUri, index, key) => {
        try {
            const formData = new FormData();
            const blob = base64ToBlob(dataUri);
            formData.append('files', blob, 'image.jpg');

            const { data } = await axiosWrapper(
                'post',
                `${import.meta.env.VITE_API_URL}/api/media/upload`,
                formData,
                false,
                true
            );

            const imagePath = data[0].path;

            const [...rest] = dentsInfoList;

            const isIndexExist = rest?.length
                ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName)
                : -1;

            if (isIndexExist > -1) {
                rest[isIndexExist][key][index] = imagePath;
                setDentsInfoList(rest);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const isShowNextButton = () => {
        const [...rest] = dentsInfoList;
        const screens = ['VinReview', 'OdometerReview'];

        const isScreenExist = screens.includes(screenList[activeStep]?.screenName);

        return isScreenExist;
    };

    const nextStep = () => {
        const [...rest] = dentsInfoList;
        const screens = ['VinReview', 'OdometerReview'];

        const isScreenExist = screens.includes(rest[activeStep - 2]?.title);

        if (!isScreenExist) {
            let restData = null;

            if (screenList[activeStep]?.screenName === 'VinReview') {
                restData = {
                    doorJamVinImages: [],
                    dashboardVinImages: [],
                    vinNumber: '',
                    dentType: 'NULL',
                    dentSize: 'NULL'
                };
            } else if (screenList[activeStep]?.screenName === 'OdometerReview') {
                restData = { odoMeterNumber: '', miles: '', dentType: 'NULL', dentSize: 'NULL' };
            }

            const newData = {
                ...getActiveStepInfo([]),
                dentType: '',
                dentSize: '',
                ...restData
            };

            rest.push({ ...newData });
            setDentsInfoList(rest);
        } else {
            if (screenList[activeStep]?.screenName === 'OdometerReview' && !rest[activeStep - 2].odoMeterNumber) {
                toast.error('OdoMeterNumber required');
                return;
            }
        }

        setActiveStep(activeStep + 1);
    };

    const odoMeterReviewHandler = (key, value) => {
        const [...rest] = dentsInfoList;

        const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenList[getIndex]?.screenName) : -1;

        if (isIndexExist > -1) {
            if (key === 'odoMeterNumber') {
                rest[isIndexExist].odoMeterNumber = value;
            } else if (key === 'miles') {
                rest[isIndexExist].miles = value;
            }
        } else {
            const newData = {
                ...getActiveStepInfo([]),
                dentType: '',
                dentSize: ''
            };
            rest.push({ ...newData, [key]: value });
        }

        setDentsInfoList(rest);
    };

    const reviewAndSubmitHandler = async (dataUri, screenName, index) => {
        try {
            const formData = new FormData();
            const blob = base64ToBlob(dataUri);
            formData.append('files', blob, 'image.jpg');

            const { data } = await axiosWrapper(
                'post',
                `${import.meta.env.VITE_API_URL}/api/media/upload`,
                formData,
                false,
                true
            );

            const [...rest] = dentsInfoList;

            const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenName) : -1;

            rest[isIndexExist].images[index] = data[0]?.path;

            setDentsInfoList(rest);
        } catch (error) {
            console.log({ error });
        }
    };

    const vinOrOdoNumberHandler = async (screenName, value, key) => {
        const [...rest] = dentsInfoList;

        const isIndexExist = rest?.length ? rest.findIndex((el) => el.title === screenName) : -1;

        if (isIndexExist > -1) {
            rest[isIndexExist][key] = value;
            setDentsInfoList(rest);
        }
    };

    const _submit = async () => {
        try {
            const { data } = await axiosWrapper(
                'put',
                `${import.meta.env.VITE_API_URL}/api/claim/submit`,
                {
                    claimID,
                    dentList: dentsInfoList
                },
                false,
                false
            );

            setClaim(data);
            setActiveStep(activeStep + 1);
        } catch (error) {
            console.log({ error });
        }
    };

    const uploadImageFromGallery = (e) => {
        const file = e.target.files[0];
        const imagesExtensions = ['png', 'jpeg', 'jpg'];

        const isExtensionAllow = imagesExtensions.findIndex((el) => file.type.includes(el)) < 0 ? false : true;

        if (!isExtensionAllow) {
            toast.error('Only allowed png, jpeg, jpg');
            return;
        }

        imageUploadRef.current.value = null;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            showLoader(true);
            handleTakePhoto(reader.result);
        };
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };
    };

    const openUploadImageFromGallery = () => {
        imageUploadRef.current.click();
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const renderStepsUI = (image) => (
        <div className="mt-4">
            <h2>Super Cool Claim Pictures</h2>

            <div className="for-step-img">
                <div className="stepper-img">
                    <img src={image} alt={`Step`} />
                </div>

                <div className="id-number">
                    <p>132-041</p>
                </div>
            </div>
        </div>
    );

    const renderButtons = () => (
        <div className="end-button mt-5 mb-3">
            <button className="lato-regular without-background mt-3" type="button"
                style={{
                    backgroundColor: 'transparent',
                    color: '#FF8C00', // Tertiary color for Back button
                    border: '2px solid #FF8C00',
                    padding: '10px',
                    borderRadius: '36px',
                    fontSize: '16px'
                }}
                onClick={goBack}>
                Back
            </button>

            {activeStep === screenList.length - 1 && (
                <button className="lato-regular with-background mt-3" onClick={_submit}>
                    Submit
                </button>
            )}

            {activeStep !== screenList.length - 1 && !isShowNextButton() && (
                <>
                    <button
                        className="lato-regular with-background mt-3"
                        onClick={() => {
                            setIsCameraOpen(true);
                        }}
                    >
                        Take Pic
                    </button>
                    <button className="lato-regular with-background mt-3" onClick={openUploadImageFromGallery}>
                        Upload image
                    </button>
                </>
            )}

            {activeStep !== screenList.length - 1 && isShowNextButton() && (
                <button className="lato-regular with-background mt-3" type="button" onClick={nextStep}>
                    Next
                </button>
            )}
        </div>
    );

    const renderUIWrapper = (Component) => (
        <>
            {renderStepsUI(screenList[getIndex]?.stepImage)}
            <Component />
            {renderButtons()}
            {screenList[getIndex]?.screenName === 'Sunroof' && (
                <div className="end-text mt-2 mb-4" onClick={skipStep}>
                    <p>I don't have one</p>
                </div>
            )}
        </>
    );

    const renderScreen = () => {
        switch (activeStep) {
            case 0:
                return <WelcomeScreen claim={claim} setActiveStep={setActiveStep} pageIndex={activeStep} />;

            case 1:
                return <HowItWorks setActiveStep={setActiveStep} pageIndex={activeStep} />;

            case 2:
                return renderUIWrapper(Hood);

            case 3:
                return renderUIWrapper(PassengerFender);

            case 4:
                return renderUIWrapper(Cowl);

            case 5:
                return renderUIWrapper(PassengerFrontDoor);

            case 6:
                return renderUIWrapper(PassengerRoofRail);

            case 7:
                return renderUIWrapper(Roof);

            case 8:
                return renderUIWrapper(Sunroof);

            case 9:
                return renderUIWrapper(PassengerRearDoor);

            case 10:
                return renderUIWrapper(PassengerQuarterPanel);

            case 11:
                return renderUIWrapper(DeckLidGate);

            case 12:
                return renderUIWrapper(DriverQuarterPanel);

            case 13:
                return renderUIWrapper(DriverRearDoor);

            case 14:
                return renderUIWrapper(DriverRoofRail);

            case 15:
                return renderUIWrapper(DriverFrontDoor);

            case 16:
                return renderUIWrapper(DriverFender);

            case 17:
                return renderUIWrapper(DashboardVin);

            case 18:
                return renderUIWrapper(DoorJamVIN);

            case 19:
                return (
                    <>
                        {renderStepsUI(screenList[getIndex]?.stepImage)}
                        <VinReview
                            pVinReviewHandler={vinReviewHandler}
                            pDentInfo={singleStepDetail}
                            pVinReviewEditImageHandler={vinReviewEditImageHandler}
                        />
                        {renderButtons()}
                    </>
                );

            case 20:
                return renderUIWrapper(Odometer);

            case 21:
                return (
                    <>
                        {renderStepsUI(screenList[getIndex]?.stepImage)}
                        <OdometerReview pOdoMeterReviewHandler={odoMeterReviewHandler} pDentInfo={singleStepDetail} />
                        {renderButtons()}
                    </>
                );

            case 22:
                return (
                    <>
                        {renderStepsUI(screenList[getIndex]?.stepImage)}
                        <ReviewAndSubmit
                            pReviewAndSubmitHandler={reviewAndSubmitHandler}
                            pVinOrOdoNumberHandler={vinOrOdoNumberHandler}
                            pDentInfo={singleStepDetail}
                            pDentsInfoList={dentsInfoList}
                        />
                        {renderButtons()}
                    </>
                );
            case 23:
                return <ClaimSubmitted claimID={claimID} status={claim?.status} />;

            default:
                return <ClaimSubmitted claimID={claimID} status={claim?.status} />;
        }
    };

    return (
        <div id="main_stepper" className="main-stepper">
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            ) : Object.keys(claim)?.length ? (
                isQualityCheck ? (
                    <QualityCheck
                        pDentInfo={singleStepDetail}
                        pAddNewImageHandler={addNewImageHandler}
                        pHandleSubmit={handleSubmit}
                        pGoBack={goBackOneStep}
                        pIsShowCloserLook={
                            dentsInfoList.findIndex((el) => ['Odometer'].includes(el.title)) > -1 ? false : true
                        }
                    />
                ) : !isCameraOpen ? (
                    <Container>{renderScreen()}</Container>
                ) : (
                    <div className="camera-div">
                        <Camera
                            isImageMirror={false}
                            idealFacingMode="environment"
                            onTakePhoto={(dataUri) => {
                                handleTakePhoto(dataUri);
                            }}
                        />
                    </div>
                )
            ) : (
                <div className="claim_not_exist">
                    {/* <h1 className="text-center">Claim Not Exist With this id: {claimID}</h1> */}
                    <h2>Claim Not Found</h2>
                    <p>
                        We could not find the claim you are looking for. It may have been deleted, or the URL you used
                        may be incorrect.
                    </p>
                </div>
            )}

            <input
                className="imageUploadRef"
                type="file"
                ref={imageUploadRef}
                onChange={uploadImageFromGallery}
                multiple={false}
            />
        </div>
    );
};

ClaimWrapper.propTypes = {};

export default ClaimWrapper;
