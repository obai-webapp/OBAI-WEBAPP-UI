import React from 'react';
import './EditClaimModal.scss';
import { Modal } from 'react-bootstrap';
import { Form as FormikForm, Formik } from 'formik';
import Input from '../../Input/Input';

const EditClaimModal = ({ closeEditModal, editModal, handleEditForm }) => {
    // future use
    // const initialValuesEditClaims = {
    //     claim: '',
    //     insurance: '',
    //     vehicle: '',
    //     vehicleOwner: ''
    // };

    // const validationSchemaEditClaim = Yup.object().shape({
    //     claim: Yup.string().required('Claim is required'),
    //     insurance: Yup.string().required('Insurance is required'),
    //     vehicle: Yup.string().required('Vehicle is required'),
    //     vehicleOwner: Yup.string().required('Vehicle Owner is required')
    // });
    return (
        <div>
            <Modal show={editModal} onHide={closeEditModal} className="edit-claim" centered>
                <Modal.Body>
                    <div>
                        <h4>Edit Claim</h4>
                    </div>
                    <div className="edit-form ">
                        <Formik
                            initialValues={initialValuesEditClaims}
                            validationSchema={validationSchemaEditClaim}
                            onSubmit={handleEditForm}
                        >
                            <FormikForm className="w-100 m-0">
                                <div className="mt-4 ">
                                    <Input name="claim" placeholder="Claim" type="text" />
                                </div>
                                <div className="mt-4 ">
                                    <Input name="insurance" placeholder="Insurance" type="text" />
                                </div>
                                <div className="mt-4 ">
                                    <Input name="vehicle" placeholder="Vehicle" type="text" />
                                </div>
                                <div className="mt-4 ">
                                    <Input name="vehicleOwner" placeholder="Vehicle Owner" type="text" />
                                </div>

                                <div className="d-flex justify-content-center mt-5 mb-4">
                                    <button
                                        className="lato-regular without-background"
                                        type="button"
                                        onClick={closeEditModal}
                                    >
                                        Cancel
                                    </button>
                                    <button className="lato-regular with-background ms-3" type="submit">
                                        Next
                                    </button>
                                </div>
                            </FormikForm>
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditClaimModal;
