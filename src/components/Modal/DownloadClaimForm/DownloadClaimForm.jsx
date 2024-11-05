import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import './DownloadClaimForm.scss';

const DownloadClaimForm = ({ downloadClaim, closeDownloadClaim, claimData, downloadClaimAsPDF }) => {
    return (
        <div>
            <Modal show={downloadClaim} onHide={closeDownloadClaim} centered size="lg" className="download-pdf">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Download Claim</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="view-width" id="accordian-id-to-download">
                            {/* Vehicle Owner Information  */}
                            <div id="vehicle-bg" className="form-head">
                                <h4>Vehicle Owner Information</h4>
                            </div>
                            <Row className="mt-3">
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Owner Name</h5>

                                    <p>{claimData?.vehicle?.ownerName || '-'}</p>
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Owner Number</h5>

                                    <p>{claimData?.vehicle?.ownerNumber || '-'}</p>
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Owner Address</h5>

                                    <p>{claimData?.vehicle?.locationAddressOne || '-'}</p>
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Address 2 (Apt Number, etc)</h5>
                                    <p>{claimData?.vehicle?.locationAddressTwo || '-'}</p>
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>City</h5>
                                    <p>{claimData?.vehicle?.city || '-'}</p>
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>State</h5>
                                    <p>{claimData?.vehicle?.state || '-'}</p>
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Zip Code</h5>
                                    <p>{claimData?.vehicle?.zip || '-'}</p>
                                </Col>
                            </Row>

                            {/* Vehicle Information */}

                            <div className="mt-3">
                                <div id="vehicle-bg-1" className="form-head">
                                    <h4>Vehicle Information</h4>
                                </div>
                                <Row className="mt-3">
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Make</h5>
                                        <p>{claimData?.vehicle?.make || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Model</h5>
                                        <p>{claimData?.vehicle?.model || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Year</h5>
                                        <p>{claimData?.vehicle?.year || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Color</h5>
                                        <p>{claimData?.vehicle?.color || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle License Plate</h5>
                                        <p>{claimData?.vehicle?.plateNumber || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle VIN</h5>
                                        <p>{claimData?.vehicle?.vin || '-'}</p>
                                    </Col>
                                </Row>
                            </div>

                            {/* Vehicle Location Information */}

                            <div className="mt-3">
                                <div id="vehicle-bg-2" className="form-head">
                                    <h4>Vehicle Location Information</h4>
                                </div>
                                <Row className="mt-3">
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Contact Name</h5>
                                        <p>{claimData?.vehicle?.locationName || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Contact Number</h5>
                                        <p>{claimData?.vehicle?.locationNumber || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Vehicle Address</h5>
                                        <p>{claimData?.vehicle?.locationAddressOne || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Address 2 (Apt Number, etc)</h5>
                                        <p>{claimData?.vehicle?.locationAddressTwo || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>City</h5>
                                        <p>{claimData?.vehicle?.locationCity || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>State</h5>
                                        <p>{claimData?.vehicle?.locationState || '-'}</p>
                                    </Col>
                                    <Col lg={6} md={6} className="mb-3">
                                        <h5>Zip Code</h5>
                                        <p>{claimData?.vehicle?.locationZip || '-'}</p>
                                    </Col>
                                </Row>
                            </div>

                            {/* Claim Pictures  */}

                            {/* <div className="mt-3 for-radio">
                            <h4>Claim Pictures</h4>
                            <Row>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Basics</h5>
                                    {isEditing
                                        ? basicData.map((item) => (
                                              <div key={item.id}>
                                                  <Form.Check
                                                      type={'checkbox'}
                                                      id={`basic-${item.id}`}
                                                      label={
                                                          <div
                                                              className={basicId === item.id ? 'active' : 'non-active'}
                                                          >
                                                              {item.label}
                                                          </div>
                                                      }
                                                      checked={basicId === item.id}
                                                      onChange={() => handleCheckboxChange(item.id, 'basics')}
                                                  />
                                              </div>
                                          ))
                                        : basicData.map((item) => (
                                              <div key={item.id}>
                                                  <p
                                                      className={
                                                          isRadioChecked && basicId === item.id
                                                              ? 'active-label'
                                                              : 'non-active-label'
                                                      }
                                                  >
                                                      {item.label}
                                                  </p>
                                              </div>
                                          ))}
                                </Col>

                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Exterior</h5>
                                    {isEditing
                                        ? exteriorData.map((item) => (
                                              <div key={item.id}>
                                                  <Form.Check
                                                      type={'checkbox'}
                                                      id={`exterior-${item.id}`}
                                                      label={
                                                          <div
                                                              className={
                                                                  exteriorId === item.id ? 'active' : 'non-active'
                                                              }
                                                          >
                                                              {item.label}
                                                          </div>
                                                      }
                                                      checked={exteriorId === item.id}
                                                      onChange={() => handleCheckboxChange(item.id, 'exterior')}
                                                  />
                                              </div>
                                          ))
                                        : exteriorData.map((item) => (
                                              <div key={item.id}>
                                                  <p
                                                      className={
                                                          isRadioChecked && exteriorId === item.id
                                                              ? 'active-label'
                                                              : 'non-active-label'
                                                      }
                                                  >
                                                      {item.label}
                                                  </p>
                                              </div>
                                          ))}
                                </Col>

                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Interior</h5>
                                    {isEditing
                                        ? interiorData.map((item) => (
                                              <div key={item.id}>
                                                  <Form.Check
                                                      type={'checkbox'} // Change type to checkbox
                                                      id={`interior-${item.id}`}
                                                      label={
                                                          <div
                                                              className={
                                                                  interiorId === item.id ? 'active' : 'non-active'
                                                              }
                                                          >
                                                              {item.label}
                                                          </div>
                                                      }
                                                      checked={interiorId === item.id}
                                                      onChange={() => handleCheckboxChange(item.id, 'interior')}
                                                  />
                                              </div>
                                          ))
                                        : interiorData.map((item) => (
                                              <div key={item.id}>
                                                  <p
                                                      className={
                                                          isRadioChecked && interiorId === item.id
                                                              ? 'active-label'
                                                              : 'non-active-label'
                                                      }
                                                  >
                                                      {item.label}
                                                  </p>
                                              </div>
                                          ))}
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Mechanical</h5>
                                    {isEditing
                                        ? mechanicalData.map((item) => (
                                              <div key={item.id}>
                                                  <Form.Check
                                                      type={'checkbox'} // Change type to checkbox
                                                      id={`mechanical-${item.id}`}
                                                      label={
                                                          <div
                                                              className={
                                                                  mechanicalId === item.id ? 'active' : 'non-active'
                                                              }
                                                          >
                                                              {item.label}
                                                          </div>
                                                      }
                                                      checked={mechanicalId === item.id}
                                                      onChange={() => handleCheckboxChange(item.id, 'mechanical')}
                                                  />
                                              </div>
                                          ))
                                        : mechanicalData.map((item) => (
                                              <div key={item.id}>
                                                  <p
                                                      className={
                                                          isRadioChecked && mechanicalId === item.id
                                                              ? 'active-label'
                                                              : 'non-active-label'
                                                      }
                                                  >
                                                      {item.label}
                                                  </p>
                                              </div>
                                          ))}
                                </Col>
                                <Col lg={6} md={6} className="mb-3">
                                    <h5>Damage</h5>
                                    {isEditing
                                        ? damageData.map((item) => (
                                              <div key={item.id}>
                                                  <Form.Check
                                                      type={'checkbox'} // Change type to checkbox
                                                      id={`damage-${item.id}`}
                                                      label={
                                                          <div
                                                              className={damageId === item.id ? 'active' : 'non-active'}
                                                          >
                                                              {item.label}
                                                          </div>
                                                      }
                                                      checked={damageId === item.id}
                                                      onChange={() => handleCheckboxChange(item.id, 'damage')}
                                                  />
                                              </div>
                                          ))
                                        : damageData.map((item) => (
                                              <div key={item.id}>
                                                  <p
                                                      className={
                                                          isRadioChecked && damageId === item.id
                                                              ? 'active-label'
                                                              : 'non-active-label'
                                                      }
                                                  >
                                                      {item.label}
                                                  </p>
                                              </div>
                                          ))}
                                </Col>

                                <Col lg={6} md={6} className="mb-3 d-flex align-items-center justify-content-end">
                                    {isEditing ? (
                                        <button onClick={handleSaveClick} className="save-btn">
                                            Save
                                            <img src={tick} alt="tick" className="edit-icon" />
                                        </button>
                                    ) : (
                                        <img src={edit} alt="edit" className="edit-icon" onClick={handleEditClick} />
                                    )}
                                </Col>
                            </Row>
                        </div> */}
                        </div>

                        <div className="pdf-btn">
                            <button type="button" onClick={downloadClaimAsPDF}>
                                Downlaod Pdf
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DownloadClaimForm;
