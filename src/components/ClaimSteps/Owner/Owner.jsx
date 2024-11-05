import React from 'react';
import Input from '../../Input/Input';
import { Form as FormikForm, Formik } from 'formik';

const Owner = ({ initialValuesOwner, validationSchemaOwner, handleSubmit }) => {
    return (
        <div className="auth-form-wrapper owner-margin mt-5">
            <Formik
                initialValues={initialValuesOwner}
                validationSchema={validationSchemaOwner}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <FormikForm>
                    <div className="mt-4">
                        <Input name="ownerName" placeholder="Vehicle Owner’s Name" type="text" />
                    </div>
                    <div className="mt-4">
                        <Input name="ownerNumber" placeholder="Vehicle Owner’s Number" type="text" />
                    </div>
                    <div className="mt-4">
                        <Input name="ownerAddressOne" placeholder="Vehicle Owner’s Address Line 1" type="text" />
                    </div>
                    <div className="mt-4">
                        <Input
                            name="ownerAddressTwo"
                            placeholder="Vehicle Owner’s Address Line 2 (Po Box, etc)"
                            type="text"
                        />
                    </div>
                    <div className="owner-form">
                        <div className="mt-4">
                            <Input name="city" placeholder="City" type="text" />
                        </div>
                        <div className="mt-4 ms-3">
                            <Input name="state" placeholder="State" type="text" />
                        </div>
                    </div>
                    <div className="mt-4 owner-form">
                        <Input name="zip" placeholder="Zip Code" type="text" />
                    </div>
                    <button
                        className="d-none"
                        id="owner-submit"
                        type="submit"
                        style={{ backgroundColor: '#FF5F1E', color: 'white' }} // Applying new brand color
                    >
                        Submit
                    </button>
                </FormikForm>
            </Formik>
        </div>
    );
};

export default Owner;
