import React, { useState } from 'react';
import './Pictures.scss';
import { Col, Form, Row } from 'react-bootstrap';

const Pictures = ({
    basicOptions,
    setBasicOptions,
    exteriorOptions,
    setExteriorOptions,
    interiorOptions,
    setInteriorOptions,
    mechanicalOptions,
    setMechanicalOptions,
    damageOptions,
    setDamageOptions
}) => {
    const basicData = [
        {
            id: 1,
            title: 'Vin + Odometer + Plate',
            description: 'Dashboard VIN, Doorjam VIN, Odometer, License Plate'
        },
        {
            id: 2,
            title: 'UPD (Unrelated Prior Damage)',
            description: 'Exterior, Interior, Internal, etc'
        }
    ];
    const exteriorData = [
        {
            id: 1,
            title: 'Four Corners',
            description: 'Front Driver, Front Passenger, Rear Passenger, Rear Driv...'
        },
        {
            id: 2,
            title: 'Sides',
            description: 'Front, Driver Side, Rear, Passenger Side'
        },
        {
            id: 3,
            title: 'Tires',
            description: 'Driver Front Tread, Passenger Front Tread, Passenger Re...'
        }
    ];
    const interiorData = [
        {
            id: 1,
            title: 'Seats + Carpet (Cars & Trucks)',
            description: 'Driver Seat, Passenger Seat, Rear Backseat, Driver Carpe...'
        },
        {
            id: 2,
            title: 'Seats + Carpet (Mini-Vans & SUVs)',
            description: 'Driver Seat, Passenger Seat, Rear Driver Seat, Rear Passe...e'
        },
        {
            id: 3,
            title: 'Controls',
            description: 'Driver Door Panel Control, Driver Seat Control, Headline...'
        }
    ];
    const mechanicalData = [
        {
            id: 1,
            title: 'Engine Bay',
            description: 'Engine Bay, Model of Vehicle'
        },
        {
            id: 2,
            title: 'Conditioning',
            description: 'Paint Fading, Scratches, Oil Leaking from Engine, Clear C...'
        }
    ];
    const damageData = [
        {
            id: 1,
            title: 'Damage',
            description: 'Close Up of Damage, Medium Distance from Damage, Al...'
        }
    ];

    const handleCheckboxChange = (id, category) => {
        switch (category) {
            case 'basic':
                setBasicOptions((options) =>
                    options.includes(id) ? options.filter((option) => option !== id) : [...options, id]
                );
                break;
            case 'exterior':
                setExteriorOptions((options) =>
                    options.includes(id) ? options.filter((option) => option !== id) : [...options, id]
                );
                break;
            case 'interior':
                setInteriorOptions((options) =>
                    options.includes(id) ? options.filter((option) => option !== id) : [...options, id]
                );
                break;
            case 'mechanical':
                setMechanicalOptions((options) =>
                    options.includes(id) ? options.filter((option) => option !== id) : [...options, id]
                );
                break;
            case 'damage':
                setDamageOptions((options) =>
                    options.includes(id) ? options.filter((option) => option !== id) : [...options, id]
                );
                break;
            default:
                break;
        }
    };

    return (
        <div className="picture-step mt-5">
            <div className="width-handler">
                <Row>
                    <h4>Basics</h4>
                    {basicData.map((item) => (
                        <Col lg={6} key={item.id} className="mt-4">
                            <div
                                className={basicOptions.includes(item.id) ? 'active-col' : 'non-active-col'}
                                onClick={() => handleCheckboxChange(item.id, 'basic')}
                            >
                                <Row>
                                    <Col lg={12} className="d-flex align-items-center">
                                        <Form.Check
                                            type={'radio'}
                                            checked={basicOptions.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id, 'basic')}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h5 className="ms-3">{item.title}</h5>
                                    </Col>
                                    <Col lg={12} className="mt-2 mb-2">
                                        <p>{item.description}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <h4 className="mt-4">Exterior</h4>
                    {exteriorData.map((item) => (
                        <Col lg={6} key={item.id} className="mt-4">
                            <div
                                className={exteriorOptions.includes(item.id) ? 'active-col' : 'non-active-col'}
                                onClick={() => handleCheckboxChange(item.id, 'exterior')}
                            >
                                <Row>
                                    <Col lg={12} className="d-flex align-items-center">
                                        <Form.Check
                                            type={'radio'}
                                            checked={exteriorOptions.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id, 'exterior')}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h5 className="ms-3">{item.title}</h5>
                                    </Col>
                                    <Col lg={12} className="mt-2 mb-2">
                                        <p>{item.description}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <h4 className="mt-4">Interior</h4>
                    {interiorData.map((item) => (
                        <Col lg={6} key={item.id} className="mt-4">
                            <div
                                className={interiorOptions.includes(item.id) ? 'active-col' : 'non-active-col'}
                                onClick={() => handleCheckboxChange(item.id, 'interior')}
                            >
                                <Row>
                                    <Col lg={12} className="d-flex align-items-center">
                                        <Form.Check
                                            type={'radio'}
                                            checked={interiorOptions.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id, 'interior')}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h5 className="ms-3">{item.title}</h5>
                                    </Col>
                                    <Col lg={12} className="mt-2 mb-2">
                                        <p>{item.description}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <h4 className="mt-4">Mechanical</h4>
                    {mechanicalData.map((item) => (
                        <Col lg={6} key={item.id} className="mt-4">
                            <div
                                className={mechanicalOptions.includes(item.id) ? 'active-col' : 'non-active-col'}
                                onClick={() => handleCheckboxChange(item.id, 'mechanical')}
                            >
                                <Row>
                                    <Col lg={12} className="d-flex align-items-center">
                                        <Form.Check
                                            type={'radio'}
                                            checked={mechanicalOptions.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id, 'mechanical')}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h5 className="ms-3">{item.title}</h5>
                                    </Col>
                                    <Col lg={12} className="mt-2 mb-2">
                                        <p>{item.description}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row className="mb-5">
                    <h4 className="mt-4">Damage</h4>
                    {damageData.map((item) => (
                        <Col lg={6} key={item.id} className="mt-4">
                            <div
                                className={damageOptions.includes(item.id) ? 'active-col' : 'non-active-col'}
                                onClick={() => handleCheckboxChange(item.id, 'damage')}
                            >
                                <Row>
                                    <Col lg={12} className="d-flex align-items-center">
                                        <Form.Check
                                            type={'radio'}
                                            checked={damageOptions.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id, 'damage')}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h5 className="ms-3">{item.title}</h5>
                                    </Col>
                                    <Col lg={12} className="mt-2 mb-2">
                                        <p>{item.description}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Pictures;
