import React, { useEffect, useState } from 'react';
import ViewClaimHeader from '../../components/ViewClaimHeader/ViewClaimHeader';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';
import './ViewClaims.scss';
import edit from '@icons/claim/edit.png';
import tick from '@icons/tick.svg';
import ArchiveModal from '../../components/Modal/ArchiveModal/ArchiveModal';
import { useLocation } from 'react-router-dom';
import axiosWrapper from '../../utils/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import ReviewAndSubmit from '../../components/StepperChilds/ReviewAndSubmit/ReviewAndSubmit';
import { priceData, screenList } from '../../helpers/helpers';

const ViewClaims = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [basicId, setBasicId] = useState(null);
    const [exteriorId, setExteriorId] = useState(null);
    const [interiorId, setInteriorId] = useState(null);
    const [mechanicalId, setMechanicalId] = useState(null);
    const [damageId, setDamageId] = useState(null);
    const [isRadioChecked, setIsRadioChecked] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [claimData, setClaimData] = useState({});
    const [loading, setLoading] = useState(false);
    const { userToken } = useSelector((state) => state?.auth);

    const location = useLocation();
    const claimId = location.pathname.split('/').pop();

    const changeHandler = (key) => (event) => {
        const { vehicle, ...rest } = claimData;
        vehicle[key] = event.target.value;
        rest.vehicle = vehicle;
        setClaimData(rest);
    };

    useEffect(() => {
        fetchClaimData();
    }, [claimId]);

    const fetchClaimData = async () => {
        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/${claimId}`;
            const { data } = await axiosWrapper('get', apiUrl);
            setClaimData(data);
        } catch (error) {
            toast.error('Error fetching claim data:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeArchiveModal = () => setShowArchiveModal(false);
    const openArchiveModal = () => setShowArchiveModal(true);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    //    update claim data (api)

    const updateClaimData = async () => {
        try {
            const {
                vehicle: { _id: vehicleId, createdAt: vehicleCreatedAt, updatedAt: vehicleUpdatedAt, ...vehicleRest },
                _id,
                createdAt,
                updatedAt,
                isDeleted,
                deleteDate,
                dentInfo,
                __v,
                ...rest
            } = claimData;

            const updatedClaimData = {
                vehicle: { ...vehicleRest },
                ...rest
            };
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/${claimId}`;
            const { data } = await axiosWrapper('put', apiUrl, updatedClaimData, userToken);
            setClaimData(data);
        } catch (error) {
            // Handle errors
            toast.error('Error updating claim data:', error);
        }
    };

    const handleSaveClick = () => {
        updateClaimData();
        setIsEditing(false);
        setIsRadioChecked(true);
        // Perform save operation here
    };
    const basicData = [
        {
            id: 1,
            label: 'Vin + Odometer + Plate'
        },
        {
            id: 2,
            label: 'UDP'
        }
    ];
    const exteriorData = [
        {
            id: 1,
            label: 'Four Corners'
        },
        {
            id: 2,
            label: 'Sides'
        },
        {
            id: 3,
            label: 'Tires'
        }
    ];
    const interiorData = [
        {
            id: 1,
            label: 'Seats + Carpet (Small)'
        },
        {
            id: 2,
            label: 'Seats + Carpet (Large)'
        },
        {
            id: 3,
            label: 'Controls'
        }
    ];
    const mechanicalData = [
        {
            id: 1,
            label: 'Engine Bay'
        },
        {
            id: 2,
            label: 'Conditioning'
        }
    ];
    const damageData = [
        {
            id: 1,
            label: 'Damage'
        }
    ];

    const handleCheckboxChange = (id, group) => {
        switch (group) {
            case 'basics':
                setBasicId((prevId) => {
                    if (prevId === id) {
                        return null;
                    } else {
                        return id;
                    }
                });
                break;
            case 'exterior':
                setExteriorId((prevId) => {
                    if (prevId === id) {
                        return null;
                    } else {
                        return id;
                    }
                });
                break;
            case 'interior':
                setInteriorId((prevId) => {
                    if (prevId === id) {
                        return null;
                    } else {
                        return id;
                    }
                });
                break;
            case 'mechanical':
                setMechanicalId((prevId) => {
                    if (prevId === id) {
                        return null;
                    } else {
                        return id;
                    }
                });
                break;
            case 'damage':
                setDamageId((prevId) => {
                    if (prevId === id) {
                        return null;
                    } else {
                        return id;
                    }
                });
                break;
            default:
                break;
        }
    };

    // archive claims by id (api)
    const archiveSelectedClaims = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/archives`;
            const { message } = await axiosWrapper(
                'put',
                apiUrl,
                { ids: [claimId], isArchive: !claimData?.isArchive },
                userToken
            );
            fetchClaimData();
            closeArchiveModal();
            toast.dark(message);
        } catch (error) {
            console.error('Error archiving claims:', error);
        }
    };

    const getPrice = () => {
        // const dent = '1 to 5 (A)';
        // const sideName = 'Hood';
        // const size = 'Dime';

        const price = claimData?.dentInfo.reduce((a, b, i) => {
            const { dentType, title, dentSize } = b;

            const carData = priceData.find((el) => el.numberOfDents.includes(dentType));

            if (!carData) return a;

            const screenName = screenList.find((el) => el.screenName === title)?.screen;

            const sideData = carData.carSides.find((el) => el.title === screenName);

            if (!sideData) return a;

            const price = sideData.prices.find((el) => String(dentSize).includes(el.title))?.price;

            if (!price || price === 'CR') return a;

            a = a + Number(price);

            return a;
        }, 0);

        return `${price}$`;
    };

    return (
        <div className="mb-5">
            <ViewClaimHeader claimData={claimData} />
            <Container>
                {loading ? (
                    <Loading />
                ) : claimData?.length <= 0 ? (
                    <div className="d-flex justify-content-center align-items-center " style={{ height: '50vh' }}>
                        <p style={{ color: '#101c85', fontWeight: '300', marginBlock: 0 }}>No data Found</p>
                    </div>
                ) : (
                    <div className="view-content mt-5">
                        <div className="view-width">
                            <Accordion defaultActiveKey="0">
                                {/* Vehicle Owner Information  */}

                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Vehicle Owner Information</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>Owner Name</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.ownerName || '-'}
                                                        onChange={changeHandler('ownerName')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.ownerName || '-'}</p>
                                                )}
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>Owner Number</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.ownerNumber || '-'}
                                                        onChange={changeHandler('ownerNumber')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.ownerNumber || '-'}</p>
                                                )}
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>Owner Address</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.locationAddressOne || '-'}
                                                        onChange={changeHandler('locationAddressOne')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.locationAddressOne || '-'}</p>
                                                )}
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>Address 2 (Apt Number, etc)</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.locationAddressTwo || '-'}
                                                        onChange={changeHandler('locationAddressTwo')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.locationAddressTwo || '-'}</p>
                                                )}
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>City</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.city || '-'}
                                                        onChange={changeHandler('city')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.city || '-'}</p>
                                                )}
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>State</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.state || '-'}
                                                        onChange={changeHandler('state')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.state || '-'}</p>
                                                )}
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <h5>Zip Code</h5>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={claimData?.vehicle?.zip || '-'}
                                                        onChange={changeHandler('zip')}
                                                    />
                                                ) : (
                                                    <p>{claimData?.vehicle?.zip || '-'}</p>
                                                )}
                                            </Col>

                                            <Col
                                                lg={6}
                                                md={6}
                                                className="mb-3 d-flex align-items-center justify-content-end"
                                            >
                                                {isEditing ? (
                                                    <button onClick={handleSaveClick} className="save-btn">
                                                        Save
                                                        <img src={tick} alt="tick" className="edit-icon" />
                                                    </button>
                                                ) : (
                                                    <img
                                                        src={edit}
                                                        alt="edit"
                                                        className="edit-icon"
                                                        onClick={handleEditClick}
                                                    />
                                                )}
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* Vehicle Information */}

                                <div className="mt-3">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Vehicle Information</Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Make</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.make || '-'}
                                                            onChange={changeHandler('make')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.make || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Model</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.model || '-'}
                                                            onChange={changeHandler('model')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.model || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Year</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.year || '-'}
                                                            onChange={changeHandler('year')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.year || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Color</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.color || '-'}
                                                            onChange={changeHandler('color')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.color || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle License Plate</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.plateNumber || '-'}
                                                            onChange={changeHandler('plateNumber')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.plateNumber || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle VIN</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.vin || '-'}
                                                            onChange={changeHandler('vin')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.vin || '-'}</p>
                                                    )}
                                                </Col>

                                                <Col
                                                    lg={12}
                                                    md={12}
                                                    className="mb-3 d-flex align-items-center justify-content-end"
                                                >
                                                    {isEditing ? (
                                                        <button onClick={handleSaveClick} className="save-btn">
                                                            Save
                                                            <img src={tick} alt="tick" className="edit-icon" />
                                                        </button>
                                                    ) : (
                                                        <img
                                                            src={edit}
                                                            alt="edit"
                                                            className="edit-icon"
                                                            onClick={handleEditClick}
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>

                                {/* Vehicle Location Information */}

                                <div className="mt-3">
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Vehicle Location Information</Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Contact Name</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationName || '-'}
                                                            onChange={changeHandler('locationName')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationName || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Contact Number</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationNumber || '-'}
                                                            onChange={changeHandler('locationNumber')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationNumber || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Vehicle Address</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationAddressOne || '-'}
                                                            onChange={changeHandler('locationAddressOne')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationAddressOne || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Address 2 (Apt Number, etc)</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationAddressTwo || '-'}
                                                            onChange={changeHandler('locationAddressTwo')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationAddressTwo || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>City</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationCity || '-'}
                                                            onChange={changeHandler('locationCity')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationCity || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>State</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationState || '-'}
                                                            onChange={changeHandler('locationState')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationState || '-'}</p>
                                                    )}
                                                </Col>
                                                <Col lg={6} md={6} className="mb-3">
                                                    <h5>Zip Code</h5>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            value={claimData?.vehicle?.locationZip || '-'}
                                                            onChange={changeHandler('locationZip')}
                                                        />
                                                    ) : (
                                                        <p>{claimData?.vehicle?.locationZip || '-'}</p>
                                                    )}
                                                </Col>

                                                <Col
                                                    lg={6}
                                                    md={6}
                                                    className="mb-3 d-flex align-items-center justify-content-end"
                                                >
                                                    {isEditing ? (
                                                        <button onClick={handleSaveClick} className="save-btn">
                                                            Save
                                                            <img src={tick} alt="tick" className="edit-icon" />
                                                        </button>
                                                    ) : (
                                                        <img
                                                            src={edit}
                                                            alt="edit"
                                                            className="edit-icon"
                                                            onClick={handleEditClick}
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>

                                {/* Claim Pictures  */}

                                <div className="mt-3 for-radio">
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Claim Pictures</Accordion.Header>
                                        <Accordion.Body>
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
                                                                              className={
                                                                                  basicId === item.id
                                                                                      ? 'active'
                                                                                      : 'non-active'
                                                                              }
                                                                          >
                                                                              {item.label}
                                                                          </div>
                                                                      }
                                                                      checked={basicId === item.id}
                                                                      onChange={() =>
                                                                          handleCheckboxChange(item.id, 'basics')
                                                                      }
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
                                                                                  exteriorId === item.id
                                                                                      ? 'active'
                                                                                      : 'non-active'
                                                                              }
                                                                          >
                                                                              {item.label}
                                                                          </div>
                                                                      }
                                                                      checked={exteriorId === item.id}
                                                                      onChange={() =>
                                                                          handleCheckboxChange(item.id, 'exterior')
                                                                      }
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
                                                                                  interiorId === item.id
                                                                                      ? 'active'
                                                                                      : 'non-active'
                                                                              }
                                                                          >
                                                                              {item.label}
                                                                          </div>
                                                                      }
                                                                      checked={interiorId === item.id}
                                                                      onChange={() =>
                                                                          handleCheckboxChange(item.id, 'interior')
                                                                      }
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
                                                                                  mechanicalId === item.id
                                                                                      ? 'active'
                                                                                      : 'non-active'
                                                                              }
                                                                          >
                                                                              {item.label}
                                                                          </div>
                                                                      }
                                                                      checked={mechanicalId === item.id}
                                                                      onChange={() =>
                                                                          handleCheckboxChange(item.id, 'mechanical')
                                                                      }
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
                                                                              className={
                                                                                  damageId === item.id
                                                                                      ? 'active'
                                                                                      : 'non-active'
                                                                              }
                                                                          >
                                                                              {item.label}
                                                                          </div>
                                                                      }
                                                                      checked={damageId === item.id}
                                                                      onChange={() =>
                                                                          handleCheckboxChange(item.id, 'damage')
                                                                      }
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

                                                <Col
                                                    lg={6}
                                                    md={6}
                                                    className="mb-3 d-flex align-items-center justify-content-end"
                                                >
                                                    {isEditing ? (
                                                        <button onClick={handleSaveClick} className="save-btn">
                                                            Save
                                                            <img src={tick} alt="tick" className="edit-icon" />
                                                        </button>
                                                    ) : (
                                                        <img
                                                            src={edit}
                                                            alt="edit"
                                                            className="edit-icon"
                                                            onClick={handleEditClick}
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>

                                <div className="mt-3 for-radio">
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Claim details (User provided)</Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col lg={12} md={12} className="mb-3">
                                                    <div className="totalPrice">
                                                        Total price:{' '}
                                                        <span> {claimData?.dentInfo?.length ? getPrice() : ''} </span>
                                                    </div>
                                                </Col>
                                                <Col lg={12} md={12} className="mb-3">
                                                    {claimData?.dentInfo?.length ? (
                                                        <ReviewAndSubmit
                                                            pDentsInfoList={claimData.dentInfo}
                                                            pReviewAndSubmitHandler={() => {}}
                                                            pVinOrOdoNumberHandler={() => {}}
                                                            pIsAdminView={true}
                                                        />
                                                    ) : (
                                                        <h5>Claim not filled by User yet</h5>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>
                            </Accordion>

                            <div className="mt-3 d-flex justify-content-end archive-btn">
                                <p className="archive" onClick={openArchiveModal}>
                                    {claimData.isArchive ? 'Un archive' : 'Archive'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Container>

            <ArchiveModal
                closeArchiveModal={closeArchiveModal}
                showArchiveModal={showArchiveModal}
                clickAction={archiveSelectedClaims}
                isClaim={!claimData?.isArchive}
            />
        </div>
    );
};

export default ViewClaims;
