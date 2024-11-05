import React, { useState } from 'react';
import CreateClaimStep from '../../components/ClaimSteps/CreateClaimStep/CreateClaimStep';
import ClaimSteps from '../../components/ClaimSteps/ClaimSteps';
import stepOne from '@icons/claim/1.0.svg';
import stepTwo from '@icons/claim/2.0.svg';
import stepThree from '@icons/claim/3.0.svg';
import stepFour from '@icons/claim/4.0.svg';
import stepFive from '@icons/claim/5.0.svg';
import stepSix from '@icons/claim/6.0.svg';
import './CreateClaim.scss';
import { Container, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import Owner from '../../components/ClaimSteps/Owner/Owner';
import ContactStep from '../../components/ClaimSteps/ContactStep/ContactStep';
import VehicleStep from '../../components/ClaimSteps/VehicleStep/VehicleStep';
import Pictures from '../../components/ClaimSteps/Pictures/Pictures';
import ClaimCreated from '../../components/ClaimSteps/ClaimCreated/ClaimCreated';
import { useNavigate } from 'react-router-dom';
import axiosWrapper from '../../utils/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateClaim = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentSubStep, setCurrentSubStep] = useState(1);
    const [basicOptions, setBasicOptions] = useState([]);
    const [exteriorOptions, setExteriorOptions] = useState([]);
    const [interiorOptions, setInteriorOptions] = useState([]);
    const [mechanicalOptions, setMechanicalOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [damageOptions, setDamageOptions] = useState([]);
    const [claimId, setClaimId] = useState('');

    const { userToken } = useSelector((state) => state?.auth);

    const navigate = useNavigate();

    // Insurance values

    const [inititialValuesCreate, setInitialValuesCreate] = useState({
        company: '',
        claimNumber: ''
    });

    const validationSchemaCreate = Yup.object().shape({
        company: Yup.string().required('Insurance Company is required'),
        claimNumber: Yup.string().required('Claim Number is required')
    });

    // Owner values

    const [initialValuesOwner, setInitialValuesOwner] = useState({
        ownerName: '',
        ownerNumber: '',
        ownerAddressOne: '',
        ownerAddressTwo: '',
        city: '',
        state: '',
        zip: ''
    });

    const validationSchemaOwner = Yup.object().shape({
        ownerName: Yup.string().required('Vehicle Owner Name is required'),
        ownerNumber: Yup.number()
            .typeError('Owner Number must be a number')
            .required('Vehicle Owner’s Number is required'),
        ownerAddressOne: Yup.string().required('Vehicle Owner’s Address Line 1 is required'),
        ownerAddressTwo: Yup.string().required('Vehicle Owner’s Address Line 2'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.number().typeError('Zip Code must be a number').required('Zip Code is required')
    });

    // Contact values

    const [initialValuesContact, setInitialValuesContact] = useState({
        locationAddressOne: '',
        locationAddressTwo: '',
        locationCity: '',
        locationState: '',
        locationZip: '',
        vehicleContactName: '',
        vehicleContactNumber: ''
    });

    const validationSchemaContact = Yup.object().shape({
        locationAddressOne: Yup.string().required('Vehicle Location Address Line 1 is required'),
        locationAddressTwo: Yup.string().required('Vehicle Location Address Line 2 is required'),
        locationCity: Yup.string().required('City is required'),
        locationState: Yup.string().required('State is required'),
        locationZip: Yup.number().typeError('Zip Code must be a number').required('Zip Code is required')
    });

    // vehicle values

    const [initialValuesVehicle, setInitialValuesVehicle] = useState({
        make: '',
        model: '',
        year: '',
        color: '',
        plateNumber: '',
        vin: ''
    });

    const validationSchemaVehicle = Yup.object().shape({
        make: Yup.string().required('Vehicle Make is required'),
        model: Yup.string().required('Vehicle Model is required'),
        year: Yup.number().typeError('Year must be a number').required('Vehicle Year is required'),
        color: Yup.string().required('Vehicle Color is required'),
        plateNumber: Yup.string().required('Vehicle License Plate Number is required'),
        vin: Yup.string().required('Vehicle VIN is required')
    });

    //    create claim data (api)

    const createClaim = async (values) => {
        const apiData = {
            company: inititialValuesCreate?.company || '-',
            claimNumber: inititialValuesCreate?.claimNumber || '-',
            vehicle: {
                ownerName: initialValuesOwner?.ownerName || '-',
                ownerNumber: initialValuesOwner?.ownerNumber || '-',
                ownerAddressOne: initialValuesOwner?.ownerAddressOne || '-',
                ownerAddressTwo: initialValuesOwner?.ownerAddressTwo || '-',
                city: initialValuesOwner?.city || '-',
                state: initialValuesOwner?.state || '-',
                zip: initialValuesOwner?.zip || '-',
                locationName: initialValuesContact?.vehicleContactName || '-',
                locationNumber: initialValuesContact?.vehicleContactNumber || '-',
                locationAddressOne: initialValuesContact?.locationAddressOne || '-',
                locationAddressTwo: initialValuesContact?.locationAddressTwo || '-',
                locationCity: initialValuesContact?.locationCity || '-',
                locationState: initialValuesContact?.locationState || '-',
                locationZip: initialValuesContact?.locationZip || '',
                make: initialValuesVehicle?.make || '-',
                model: initialValuesVehicle?.model || '-',
                year: initialValuesVehicle?.year || '-',
                color: initialValuesVehicle?.color || '-',
                plateNumber: initialValuesVehicle?.plateNumber || '-',
                vin: initialValuesVehicle?.vin || '-'
            }
        };
        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim`;
            const { data } = await axiosWrapper('post', apiUrl, apiData, userToken);
            setClaimId(data._id);
            toast.success('Claim created successfully');
            if (currentStep < totalSteps) {
                if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
                    setCurrentSubStep(currentSubStep + 1);
                } else {
                    setCurrentStep(currentStep + 1);
                    setCurrentSubStep(1);
                }
            }
        } catch (error) {
            // Handle errors
            toast.error('Error updating claim data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setInitialValuesCreate(values);
            if (currentStep < totalSteps) {
                if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
                    setCurrentSubStep(currentSubStep + 1);
                } else {
                    setCurrentStep(currentStep + 1);
                    setCurrentSubStep(1);
                }
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };
    const handleSubmitOwner = async (values, { setSubmitting }) => {
        try {
            setInitialValuesOwner(values);
            if (currentStep < totalSteps) {
                if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
                    setCurrentSubStep(currentSubStep + 1);
                } else {
                    setCurrentStep(currentStep + 1);
                    setCurrentSubStep(1);
                }
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };
    const handleSubmitContact = async (values, { setSubmitting }) => {
        try {
            setInitialValuesContact(values);
            if (currentStep < totalSteps) {
                if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
                    setCurrentSubStep(currentSubStep + 1);
                } else {
                    setCurrentStep(currentStep + 1);
                    setCurrentSubStep(1);
                }
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };
    const handleSubmitVehicle = async (values, { setSubmitting }) => {
        try {
            setInitialValuesVehicle(values);
            if (currentStep < totalSteps) {
                if (currentSubStep < stepsComponents[currentStep - 1].children.length) {
                    setCurrentSubStep(currentSubStep + 1);
                } else {
                    setCurrentStep(currentStep + 1);
                    setCurrentSubStep(1);
                }
            }
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };

    const stepsComponents = [
        {
            id: 1,
            name: 'DriverStep',
            component: <ClaimSteps />,
            children: [
                {
                    id: '2',
                    name: 'CreateClaimStep',
                    component: (
                        <CreateClaimStep
                            validationSchemaCreate={validationSchemaCreate}
                            inititialValuesCreate={inititialValuesCreate}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
            ]
        },
        {
            id: 3,
            name: 'Owner',
            component: <ClaimSteps />,
            children: [
                {
                    id: '4',
                    name: 'Owner',
                    component: (
                        <Owner
                            validationSchemaOwner={validationSchemaOwner}
                            initialValuesOwner={initialValuesOwner}
                            handleSubmit={handleSubmitOwner}
                        />
                    )
                }
            ]
        },
        {
            id: 5,
            name: 'Contact',
            component: <ClaimSteps />,
            children: [
                {
                    id: '6',
                    name: 'Contact',
                    component: (
                        <ContactStep
                            validationSchemaContact={validationSchemaContact}
                            initialValuesContact={initialValuesContact}
                            handleSubmit={handleSubmitContact}
                            initialValuesOwner={initialValuesOwner}
                        />
                    )
                }
            ]
        },
        {
            id: 7,
            name: 'VehicleStep',
            component: <ClaimSteps />,
            children: [
                {
                    id: '8',
                    name: 'VehicleStep',
                    component: (
                        <VehicleStep
                            validationSchemaVehicle={validationSchemaVehicle}
                            initialValuesVehicle={initialValuesVehicle}
                            handleSubmit={handleSubmitVehicle}
                        />
                    )
                }
            ]
        },
        {
            id: 9,
            name: 'Pictures',
            component: <ClaimSteps />,
            children: [
                {
                    id: '10',
                    name: 'Pictures',
                    component: (
                        <Pictures
                            basicOptions={basicOptions}
                            setBasicOptions={setBasicOptions}
                            exteriorOptions={exteriorOptions}
                            setExteriorOptions={setExteriorOptions}
                            interiorOptions={interiorOptions}
                            setInteriorOptions={setInteriorOptions}
                            mechanicalOptions={mechanicalOptions}
                            setMechanicalOptions={setMechanicalOptions}
                            damageOptions={damageOptions}
                            setDamageOptions={setDamageOptions}
                        />
                    )
                }
            ]
        },
        {
            id: 11,
            name: 'ClaimCreated',
            component: <ClaimSteps />,
            children: [
                {
                    id: '12',
                    name: 'ClaimCreated',
                    component: <ClaimCreated claimId={claimId} />
                }
            ]
        }
    ];
    const stepstemp = [
        {
            children: [stepOne]
        },
        {
            children: [stepTwo]
        },
        {
            children: [stepThree]
        },
        {
            children: [stepFour]
        },
        {
            children: [stepFive]
        },
        {
            children: [stepSix]
        }
    ];

    const totalSteps = stepsComponents.length;

    const nextStep = () => {
        const insurance = document.getElementById('create-claim');
        const ownerSubmit = document.getElementById('owner-submit');
        const contactSubmit = document.getElementById('contact-submit');
        const vehicleSubmit = document.getElementById('vehicle-submit');

        if (vehicleSubmit) {
            vehicleSubmit.click();
        }
        if (contactSubmit) {
            contactSubmit.click();
        }
        if (ownerSubmit) {
            ownerSubmit.click();
        }
        if (insurance) {
            insurance.click();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            if (currentSubStep > 1) {
                setCurrentSubStep(currentSubStep - 1);
            } else {
                setCurrentStep(currentStep - 1);
                const prevStepChildrenLength = stepsComponents[currentStep - 1].children.length;
                setCurrentSubStep(prevStepChildrenLength);
            }
        }
    };

    const renderStepComponent = () => {
        const step = stepsComponents[currentStep - 1];
        if (step.children) {
            const component = step.children[currentSubStep - 1].component;
            return component;
        } else {
            return <div className="step-main">{step.component}</div>;
        }
    };

    const renderStepImagesComponent = () => {
        const step = stepstemp[currentStep - 1];
        const component = step?.children[currentSubStep - 1];
        return component;
    };

    return (
        <div className="create-steps">
            <Container>
                <div className="">
                    <h2> Create a Claim</h2>

                    <div className="">
                        <img src={renderStepImagesComponent()} alt={`Step`} />
                    </div>

                    <div className="">{renderStepComponent()}</div>

                    <div className="end-button mb-4">
                        {currentStep > 1 && currentStep !== totalSteps && (
                            <button
                                className="lato-regular without-background width-mob mt-3"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#FF8C00', // Tertiary color for Back button
                                    border: '2px solid #FF8C00',
                                    padding: '10px',
                                    borderRadius: '36px',
                                    fontSize: '16px'
                                }}
                                type="button"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                        )}
                        {currentStep === 1 && (
                            <button
                                className="lato-regular without-background width-mob mt-3"
                                onClick={() => navigate('/claims')}
                                type="button"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#FF8C00', // Tertiary color for Back button
                                    border: '2px solid #FF8C00',
                                    padding: '10px',
                                    borderRadius: '36px',
                                    fontSize: '16px'
                                }}
                            >
                                Cancel
                            </button>
                        )}
                        {currentStep === 5 && (
                            <button
                                className="lato-regular with-background width-mob mt-3"
                                type="button"
                                onClick={() => {
                                    createClaim();
                                }}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : 'Create'}
                            </button>
                        )}
                        {currentStep < totalSteps && currentStep !== 5 && (
                            <button
                                className="lato-regular with-background width-mob mt-3"
                                type="button"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        )}
                        {currentStep === totalSteps && (
                            <button
                                className="lato-regular with-background width-mob mt-3"
                                type="button"
                                onClick={() => navigate('/claims')}
                            >
                                Home
                            </button>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CreateClaim;
