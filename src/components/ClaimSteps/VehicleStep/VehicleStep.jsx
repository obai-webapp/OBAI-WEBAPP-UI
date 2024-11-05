import React from 'react';
import Input from '../../Input/Input';
import { Form as FormikForm, Formik } from 'formik';

const VehicleStep = ({ initialValuesVehicle, validationSchemaVehicle, handleSubmit }) => {
    return (
        <div className="auth-form-wrapper owner-margin mt-5">
            <Formik
                initialValues={initialValuesVehicle}
                validationSchema={validationSchemaVehicle}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <FormikForm>
                    <div className="mt-4">
                        <Input
                            name="make"
                            placeholder="Vehicle Make"
                            type="text"
                            style={{ borderColor: '#FF5F1E' }} // Updated to brand color
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            name="model"
                            placeholder="Vehicle Model"
                            type="text"
                            style={{ borderColor: '#FF5F1E' }} // Updated to brand color
                        />
                    </div>
                    <div className="owner-form">
                        <div className="mt-4">
                            <Input
                                name="year"
                                placeholder="Vehicle Year"
                                type="text"
                                style={{ borderColor: '#FF5F1E' }} // Updated to brand color
                            />
                        </div>
                        <div className="mt-4 ms-3">
                            <Input
                                name="color"
                                placeholder="Vehicle Color"
                                type="text"
                                style={{ borderColor: '#FF5F1E' }} // Updated to brand color
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Input
                            name="plateNumber"
                            placeholder="Vehicle License Plate Number"
                            type="text"
                            style={{ borderColor: '#FF5F1E' }} // Updated to brand color
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            name="vin"
                            placeholder="Vehicle VIN"
                            type="text"
                            style={{ borderColor: '#FF5F1E' }} // Updated to brand color
                        />
                    </div>
                    <button className="d-none" id="vehicle-submit" type="submit">
                        Submit
                    </button>
                </FormikForm>
            </Formik>
        </div>
    );
};

export default VehicleStep;
