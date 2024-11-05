import React, { useState } from 'react';
import Input from '../../Input/Input';
import { Form as FormikForm, Formik } from 'formik';
import { Form } from 'react-bootstrap';

const ContactStep = ({ initialValuesContact, validationSchemaContact, handleSubmit, initialValuesOwner }) => {
    const [showVehicleContact, setShowVehicleContact] = useState(true);
    const [showOwnerVehicleContact, setShowOwnerVehicleContact] = useState(true);

    const handleCheckboxChange = (setFieldValue) => (e) => {
        if (showVehicleContact) {
            setFieldValue('locationAddressOne', initialValuesOwner?.ownerAddressOne);
            setFieldValue('locationAddressTwo', initialValuesOwner?.ownerAddressTwo);
            setFieldValue('locationCity', initialValuesOwner?.city);
            setFieldValue('locationState', initialValuesOwner?.state);
            setFieldValue('locationZip', initialValuesOwner?.zip);
        } else {
            setFieldValue('locationAddressOne', initialValuesOwner?.ownerName);
            setFieldValue('locationAddressTwo', initialValuesOwner?.number);
        }

        setShowVehicleContact(!e.target.checked);
    };

    const handleOwnerCheckboxChange = (setFieldValue) => (e) => {
        if (showOwnerVehicleContact) {
            setFieldValue('vehicleContactName', initialValuesOwner?.ownerName);
            setFieldValue('vehicleContactNumber', initialValuesOwner?.ownerNumber);
        } else {
            setFieldValue('vehicleContactName', '');
            setFieldValue('vehicleContactNumber', '');
        }

        setShowOwnerVehicleContact(!e.target.checked);
    };

    return (
        <div className="auth-form-wrapper contact-margin">
            <Formik
                initialValues={initialValuesContact}
                validationSchema={validationSchemaContact}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, setFieldValue }) => (
                    <FormikForm>
                        <div className="mt-4 checkbox-data">
                            <Form.Check
                                type={'checkbox'}
                                id="vehicleLocationCheckbox"
                                onChange={handleCheckboxChange(setFieldValue)}
                                label="Vehicle Location same as Owner Address"
                                style={{ color: '#FF8C00' }} // New brand color for checkbox label
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                name="locationAddressOne"
                                id="locationAddressOne"
                                placeholder="Vehicle Location Address Line 1"
                                type="text"
                            />
                        </div>
                        <div className="mt-4">
                            <Input
                                name="locationAddressTwo"
                                id="locationAddressTwo"
                                placeholder="Vehicle Location Address Line 2 (Po Box, etc)"
                                type="text"
                            />
                        </div>
                        <div className="owner-form">
                            <div className="mt-4">
                                <Input name="locationCity" id="locationCity" placeholder="City" type="text" />
                            </div>
                            <div className="mt-4 ms-3">
                                <Input name="locationState" id="locationState" placeholder="State" type="text" />
                            </div>
                        </div>
                        <div className="mt-4 owner-form">
                            <Input name="locationZip" id="locationZip" placeholder="Zip Code" type="text" />
                        </div>

                        <div className="mt-4 checkbox-data">
                            <Form.Check
                                type={'checkbox'}
                                onChange={handleOwnerCheckboxChange(setFieldValue)}
                                label="Vehicle Contact Info same as Owner Info"
                                style={{ color: '#FF8C00' }} // New brand color for checkbox label
                            />
                        </div>
                        <div className="mt-4">
                            <Input name="vehicleContactName" placeholder="Vehicle Contact’s Name" type="text" />
                        </div>
                        <div className="mt-4">
                            <Input name="vehicleContactNumber" placeholder="Vehicle Contact’s Number" type="text" />
                        </div>
                        <button
                            className="d-none"
                            id="contact-submit"
                            type="submit"
                        >
                            Submit
                        </button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default ContactStep;
