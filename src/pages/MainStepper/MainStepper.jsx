import React, { useEffect, useState } from 'react';
import './MainStepper.scss';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import stepOne from '@images/steps-img/01.png';
import stepTwo from '@images/steps-img/02.png';
import stepThree from '@images/steps-img/03.png';
import stepFour from '@images/steps-img/04.png';
import stepFive from '@images/steps-img/05.png';
import stepSix from '@images/steps-img/06.png';
import stepSeven from '@images/steps-img/07.png';
import stepEight from '@images/steps-img/08.png';
import stepNine from '@images/steps-img/09.png';
import stepTen from '@images/steps-img/10.png';
import stepEleven from '@images/steps-img/11.png';
import stepTwelve from '@images/steps-img/12.png';
import stepThirteen from '@images/steps-img/13.png';
import stepFourteen from '@images/steps-img/14.png';
import stepFifteen from '@images/steps-img/15.png';
import stepSixteen from '@images/steps-img/16.png';
import stepSeventeen from '@images/steps-img/17.png';
import stepEighteen from '@images/steps-img/18.png';
import stepNineteen from '@images/steps-img/19.png';
import twenty from '@images/steps-img/20.png';
import twentOne from '@images/steps-img/21.png';
import DriverStep from '../../components/StepperChilds/DriverStep/DriverStep';
import ReviewAndSubmit from '../../components/StepperChilds/ReviewAndSubmit/ReviewAndSubmit';
import VinReview from '../../components/StepperChilds/VinStep/VinReview/VinReview';
import Odometer from '../../components/StepperChilds/OdometerStep/Odometer/Odometer';
import OdometerReview from '../../components/StepperChilds/OdometerStep/OdometerReview/OdometerStep';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import DriverFrontDoor from '../../components/StepperChilds/DriverStep/DriverFrontDoor/DriverFrontDoor';
import DriverFender from '../../components/StepperChilds/DriverStep/DriverFender/DriverFender';
import Hood from '../../components/StepperChilds/DriverStep/DriversCorner/Hood/Hood';
import PassengerFender from '../../components/StepperChilds/DriverStep/DriversCorner/PassengerFender/PassengerFender';
import Cowl from '../../components/StepperChilds/DriverStep/DriversCorner/Cowl/Cowl';
import PassengerFrontDoor from '../../components/StepperChilds/DriverStep/DriversCorner/PassengerRearCorner/PassengerRearCorner';
import Roof from '../../components/StepperChilds/DriverStep/DriversCorner/Roof/Roof';
import Sunroof from '../../components/StepperChilds/DamageStep/Damage/Sunroof/Sunroof';
import PassengerRearDoor from '../../components/StepperChilds/DamageStep/Damage/PassengerRearDoor/PassengerRearDoor';
import PassengerQuarterPanel from '../../components/StepperChilds/DamageStep/Damage/PassengerQuarterPanel/PassengerQuarterPanel';
import DeckLidGate from '../../components/StepperChilds/DamageStep/Damage/DeckLidGate/DeckLidGate';
import DriverQuarterPanel from '../../components/StepperChilds/DamageStep/Damage/DriverQuarterPanel/DriverQuarterPanel';
import DriverRearDoor from '../../components/StepperChilds/DamageStep/Damage/DriverRearDoor/DriverRearDoor';
import PassengerRoofRail from '../../components/StepperChilds/DriverStep/DriversCorner/PassengerRoofRail/PassengerRoofRail';
import DashboardVin from '../../components/StepperChilds/VinStep/Vin/Vin';
import DoorJamVIN from '../../components/StepperChilds/VinStep/VinDriverDoor/VinDriverDoor';
import DriverRoofRail from '../../components/StepperChilds/DriverStep/DriversCorner/DriverRoofRail/DriverRoofRail';
import { UpdateCapturedImage, saveCapturedImage } from '../../redux/cars_images/cars_images_slice';
import axiosWrapper from '../../utils/api';

const MainStepper = () => {
    const dispatch = useDispatch();
    const { claimID } = useParams();

    const [openCam, setOpenCam] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [currentSubStep, setCurrentSubStep] = useState(1);

    const [searchParams] = useSearchParams();
    const currentStepQuery = searchParams.get('currentStep');
    const currentSubStepQuery = searchParams.get('currentSubStep');

    useEffect(() => {
        setCurrentStep(Number(currentStepQuery || 1));
        setCurrentSubStep(Number(currentSubStepQuery || 1));
    }, [currentStepQuery, currentSubStepQuery]);

    const [stepsComponents, setStepsComponents] = useState([
        {
            id: 1,
            name: 'DriverStep',
            component: <DriverStep />,
            children: [
                {
                    id: '2',
                    name: 'Hood',
                    component: <Hood />,
                    takePicture: true,
                    dontHaveText: false
                },

                {
                    id: '3',
                    name: 'PassengerFender',
                    takePicture: true,
                    component: <PassengerFender />,
                    dontHaveText: false
                },
                {
                    id: '4',
                    name: 'Cowl',
                    takePicture: true,
                    component: <Cowl />,
                    dontHaveText: false
                },
                {
                    id: '5',
                    name: 'PassengerFrontDoor',
                    component: <PassengerFrontDoor />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '6',
                    name: 'PassengerRoofRail',
                    component: <PassengerRoofRail />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '7',
                    name: 'Roof',
                    component: <Roof />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '9',
                    name: 'Sunroof',
                    component: <Sunroof />,
                    takePicture: true,
                    dontHaveText: true
                },
                {
                    id: '10',
                    name: 'PassengerRearDoor',
                    component: <PassengerRearDoor />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '11',
                    name: 'PassengerQuarterPanel',
                    component: <PassengerQuarterPanel />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '12',
                    name: 'DeckLidGate',
                    component: <DeckLidGate />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '13',
                    name: 'DriverQuarterPanel',
                    component: <DriverQuarterPanel />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '14',
                    name: 'DriverRearDoor',
                    component: <DriverRearDoor />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '16',
                    name: 'DriverRoofRail',
                    component: <DriverRoofRail />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '17',
                    name: 'DriverFrontDoor',
                    component: <DriverFrontDoor />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '18',
                    name: 'DriverFender',
                    component: <DriverFender />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '19',
                    name: 'DashboardVin',
                    component: <DashboardVin />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '20',
                    name: 'DoorJamVIN',
                    component: <DoorJamVIN />,
                    takePicture: true,
                    dontHaveText: false
                },

                {
                    id: '21',
                    name: 'VinReview',
                    component: <VinReview />,
                    dontHaveText: false
                },
                {
                    id: '23',
                    name: 'Odometer',
                    component: <Odometer />,
                    takePicture: true,
                    dontHaveText: false
                },
                {
                    id: '24',
                    name: 'OdometerReview',
                    component: <OdometerReview />,
                    dontHaveText: false
                },
                {
                    id: 25,
                    name: 'ReviewAndSubmit',
                    component: <ReviewAndSubmit />,
                    submitButton: true,
                    dontHaveText: false
                }
            ]
        }

        // {
        //     id: 26,
        //     name: 'ReviewAndSubmit',
        //     component: <ReviewAndSubmit />,
        //     submitButton: true
        // }
    ]);

    const stepstemp = [
        {
            children: [
                stepOne,
                stepTwo,
                stepThree,
                stepFour,
                stepFive,
                stepSix,
                stepSeven,
                stepEight,
                stepNine,
                stepTen,
                stepEleven,
                stepTwelve,
                stepThirteen,
                stepFourteen,
                stepFifteen,
                stepSixteen,
                stepSeventeen,
                stepEighteen,
                stepNineteen,
                twenty,
                twentOne
            ]
        }
    ];

    const openCamera = () => {
        setOpenCam(true);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const nextStep = () => {
        if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
            setCurrentSubStep(currentSubStep + 1);
        }
        navigate(`${location.pathname}?currentStep=${currentStep}&currentSubStep=${currentSubStep + 1}`);
    };

    const dontHavePic = () => {
        if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
            setCurrentSubStep(currentSubStep + 1);
        }
        const data = {
            currentStep,
            currentSubStep: currentSubStep == 19 ? 18 : currentSubStep,
            dataUri: []
        };
        dispatch(saveCapturedImage({ data }));
        dispatch(UpdateCapturedImage({ index: currentSubStep - 1, dataUri: [] }));
        navigate(`${location.pathname}?currentStep=${currentStep}&currentSubStep=${currentSubStep + 1}`);
    };

    function base64ToBlob(base64Data) {
        const byteString = atob(base64Data.split(',')[1]);
        const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    const handleTakePhoto = async (dataUri) => {
        setOpenCam(false);
        let imagePath = '';

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

            imagePath = data[0]?.path;

            if ((currentStep === 1 && currentSubStep === 19) || (currentStep === 1 && currentSubStep === 17)) {
                const data = {
                    currentStep,
                    currentSubStep: currentSubStep == 19 ? 18 : currentSubStep,
                    dataUri: [imagePath]
                };

                data.title = stepsComponents[0].children.find((el) => el.id === String(data.currentSubStep + 1))?.name;
                dispatch(saveCapturedImage({ data }));
                dispatch(UpdateCapturedImage({ index: currentSubStep - 1, dataUri: [imagePath] }));

                navigate(
                    `/${claimID}/odometer-quality-check?currentStep=${currentStep}&currentSubStep=${currentSubStep}`
                );
            } else {
                const data = {
                    currentStep,
                    currentSubStep,
                    dataUri: [imagePath]
                };

                data.title = stepsComponents[0].children.find((el) => el.id === String(data.currentSubStep + 1))?.name;
                dispatch(saveCapturedImage({ data }));
                dispatch(UpdateCapturedImage({ index: currentSubStep - 1, dataUri: [imagePath] }));

                navigate(`/${claimID}/quality-check?currentStep=${currentStep}&currentSubStep=${currentSubStep}`);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const handleBack = () => {
        navigate(-1);
        if (currentStep + 1 === 1) {
            navigate(`/${claimID}/how-it-works`);
        }
    };

    const renderStepComponent = () => {
        if (currentStep > 0) {
            const step = stepsComponents[currentStep - 1];
            if (step.children) {
                const component = step.children[currentSubStep - 1].component;
                return component;
            } else {
                return <div className="step-main">{step.component}</div>;
            }
        }
    };

    const renderStepImagesComponent = () => {
        if (currentStep > 0) {
            const step = stepstemp[currentStep - 1];
            const component = step.children[currentSubStep - 1];
            return component;
        }
        if (currentStep + 1 === 1) {
            navigate(`/${claimID}/how-it-works`);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="main-stepper">
            {openCam === false ? (
                <>
                    <div className="mt-4">
                        <h2>Super Cool Claim Pictures</h2>

                        <div className="for-step-img">
                            <div className="stepper-img">
                                <img src={renderStepImagesComponent()} alt={`Step`} />
                            </div>

                            <div className="id-number">
                                <p>132-041</p>
                            </div>
                        </div>
                    </div>
                    <div className="steps-component">{renderStepComponent()}</div>

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
                            onClick={handleBack}>
                            Back
                        </button>

                        {stepsComponents[currentStep - 1]?.children[currentSubStep - 1]?.submitButton && (
                            <button
                                className="lato-regular with-background mt-3"
                                onClick={() => navigate(`/${claimID}/claim-submitted`)}
                            >
                                Submit
                            </button>
                        )}

                        <>
                            {stepsComponents[currentStep - 1]?.children &&
                                stepsComponents[currentStep - 1]?.children[currentSubStep - 1]?.takePicture ? (
                                <button className="lato-regular with-background mt-3" onClick={openCamera}>
                                    Take Pic
                                </button>
                            ) : !stepsComponents[currentStep - 1]?.children[currentSubStep - 1]?.submitButton ? (
                                <button className="lato-regular with-background mt-3" type="button" onClick={nextStep}>
                                    Next
                                </button>
                            ) : null}
                        </>
                    </div>

                    {stepsComponents[currentStep - 1]?.children[currentSubStep - 1]?.dontHaveText ? (
                        <div className="end-text mt-2 mb-4" onClick={dontHavePic}>
                            <p>I don't have one</p>
                        </div>
                    ) : null}
                </>
            ) : null}

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
        </div>
    );
};

export default MainStepper;
