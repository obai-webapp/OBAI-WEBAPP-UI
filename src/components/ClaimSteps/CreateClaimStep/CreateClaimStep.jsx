import React from 'react';
import Input from '../../Input/Input';
import { Form as FormikForm, Formik } from 'formik';
import './CreateClaimStep.scss';

const CreateClaimStep = ({ inititialValuesCreate, validationSchemaCreate, handleSubmit }) => {
    return (
        <div className="claim-steps mt-4">
            <div>
                <h4>Create a Claim</h4>

                <div className="d-flex justify-content-center">
                    <p style={{ color: '#FF8C00' }}>Insurance Information</p> {/* Updated to use new brand color */}
                </div>
            </div>
            <div className="auth-form-wrapper for-margin">
                <Formik
                    initialValues={inititialValuesCreate}
                    validationSchema={validationSchemaCreate}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <FormikForm>
                        <div>
                            <Input name="company" placeholder="Insurance Company" type="text" />
                        </div>
                        <div className="mt-4">
                            <Input name="claimNumber" placeholder="Claim Number" type="text" />
                        </div>
                        <button className="d-none" id="create-claim" type="submit">
                            Submit
                        </button>
                    </FormikForm>
                </Formik>
            </div>
        </div>
    );
};

export default CreateClaimStep;
