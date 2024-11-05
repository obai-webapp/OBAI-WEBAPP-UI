import React, { useEffect, useState } from 'react';
import './ViewClaimHeader.scss';
import { FaArrowLeft, FaDownload } from 'react-icons/fa'; // Import icons
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import html2pdf from 'html2pdf.js';
import DownloadClaimForm from '../Modal/DownloadClaimForm/DownloadClaimForm';

const ViewClaimHeader = ({ claimData }) => {
    const [downloadClaim, setDownloadClaim] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 576);

    const closeDownloadClaim = () => setDownloadClaim(false);
    const showDownloadClaim = () => setDownloadClaim(true);

    const navigate = useNavigate();
    const { loading } = useSelector((state) => state?.auth);

    useEffect(() => {
        function handleResize() {
            setIsWideScreen(window.innerWidth > 576);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const formContent = document.getElementById('accordian-id-to-download');
        if (formContent) {
            formContent.style.margin = '20px';
            formContent.style.padding = '20px';
        }
    }, []);

    const downloadClaimAsPDF = () => {
        const formContent = document.getElementById('accordian-id-to-download');
        const vehicleBg = document.getElementById('vehicle-bg');
        const vehicleBg1 = document.getElementById('vehicle-bg-1');
        const vehicleBg2 = document.getElementById('vehicle-bg-2');
        vehicleBg.style.backgroundColor = '#ddddff';
        vehicleBg1.style.backgroundColor = '#ddddff';
        vehicleBg2.style.backgroundColor = '#ddddff';
        vehicleBg.style.padding = '5px';
        vehicleBg1.style.padding = '5px';
        vehicleBg2.style.padding = '5px';
        vehicleBg.style.margin = '0 !important';
        const options = {
            filename: 'claim.pdf',
            margin: 0.2,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, width: 750 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(formContent).set(options).save();

        closeDownloadClaim();
    };

    return (
        <div className="view-claim-header">
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <div>
                        <h4>Claims</h4>
                    </div>

                    {isWideScreen ? (
                        <div>
                            <Row className="w-100 m-0 align-items-center mt-4">
                                <Col xs={12} md={6} lg={6} className="p-0">
                                    <div className="back-arrow">
                                        <FaArrowLeft onClick={() => navigate('/claims')} style={{ cursor: 'pointer', fontSize: '24px' }} />
                                        <p>{claimData?.claimNumber}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="w-100 m-0 head-info mt-1">
                                <Col className="mb-4">
                                    <p>{claimData?.company}</p>
                                </Col>
                                <Col className="d-flex justify-content-center mb-4">
                                    <span>
                                        {claimData?.createdAt
                                            ? format(new Date(claimData.createdAt), 'MM/dd/yyyy')
                                            : 'Unknown Date'}
                                    </span>
                                </Col>
                                <Col className="d-flex justify-content-end mb-4 p-0">
                                    <button className="download-btn" onClick={showDownloadClaim}>
                                        Download Claim
                                        <FaDownload style={{ marginLeft: '8px', fontSize: '19px' }} />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div className="for-min-screen">
                            <Row className="w-100 m-0 align-items-center mt-4">
                                <Col xs={12} md={6} lg={6} className="p-0">
                                    <Col className="back-arrow">
                                        <FaArrowLeft onClick={() => navigate('/claims')} style={{ cursor: 'pointer', fontSize: '24px' }} />
                                        <p>{claimData?.claimNumber}</p>
                                    </Col>
                                    <Col className="d-flex justify-content-center head-info mt-1">
                                        <p>{claimData?.company}</p>
                                    </Col>
                                    <Col className="d-flex justify-content-center head-info mt-1">
                                        <span>{claimData?.createdAt ? format(new Date(claimData.createdAt), 'MM/dd/yyyy') : 'Unknown Date'}</span>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="w-100 m-0">
                                <Col className="d-flex justify-content-center p-0 mb-3">
                                    <button className="download-btn" onClick={showDownloadClaim}>
                                        Download Claim
                                        <FaDownload style={{ marginLeft: '8px', fontSize: '19px' }} />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            )}
            <DownloadClaimForm
                claimData={claimData}
                downloadClaim={downloadClaim}
                closeDownloadClaim={closeDownloadClaim}
                downloadClaimAsPDF={downloadClaimAsPDF}
            />
        </div>
    );
};

export default ViewClaimHeader;
