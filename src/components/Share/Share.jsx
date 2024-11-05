import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap'; // Bootstrap for Modal
import { FaFacebook, FaTwitter, FaWhatsapp, FaTelegram, FaLinkedin, FaShareAlt, FaTimes } from 'react-icons/fa'; // Social Media Icons and Close Icon

const Share = (props) => {
    const { text, url, title } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function to open share link
    const openShareLink = (platformUrl) => {
        window.open(platformUrl, '_blank');
    };

    return (
        <div className="shareWrapper">
            {/* Share Icon Button */}
            <FaShareAlt
                onClick={handleShow}
                style={{
                    cursor: 'pointer',
                    color: '#FF8C00', // Updated brand color for the share icon
                    fontSize: '24px', // Size of the icon
                    marginRight: '10px',
                }}
            />

            {/* Custom Share Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    {/* Title */}
                    <Modal.Title
                        style={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            width: '100%',
                            color: '#171717', // Dark title text color
                        }}
                    >
                        Share this Claim
                    </Modal.Title>
                    
                    {/* Close Icon */}
                    <FaTimes
                        onClick={handleClose}
                        style={{
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: '#FF8C00', // Updated brand color
                            position: 'absolute',
                            right: '16px', // Positioned at the top-right
                            top: '16px',
                        }}
                    />
                </Modal.Header>
                
                <Modal.Body>
                    {/* Displaying the Claim URL */}
                    <p
                        style={{
                            wordBreak: 'break-all', // Breaks the long URL properly
                            color: '#171717', // Dark text color for URL
                            textDecoration: 'none', // No underline
                            cursor: 'pointer', // Indicates it's clickable
                            marginBottom: '1rem',
                            textAlign: 'center', // Center the URL
                            fontWeight: 'bold',
                        }}
                        onClick={() => window.open(url, '_blank')}
                    >
                        {url}
                    </p>

                    {/* Social Media Icons */}
                    <div
                        className="social-icons"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            padding: '1rem 0',
                            gap: '20px',
                        }}
                    >
                        <FaFacebook
                            style={{ color: '#3b5998', fontSize: '40px', cursor: 'pointer' }}
                            onClick={() => openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${url}`)}
                        />
                        <FaTwitter
                            style={{ color: '#1da1f2', fontSize: '40px', cursor: 'pointer' }}
                            onClick={() => openShareLink(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)}
                        />
                        <FaWhatsapp
                            style={{ color: '#25d366', fontSize: '40px', cursor: 'pointer' }}
                            onClick={() => openShareLink(`https://wa.me/?text=${text} ${url}`)}
                        />
                        <FaTelegram
                            style={{ color: '#0088cc', fontSize: '40px', cursor: 'pointer' }}
                            onClick={() => openShareLink(`https://telegram.me/share/url?url=${url}&text=${text}`)}
                        />
                        <FaLinkedin
                            style={{ color: '#0077b5', fontSize: '40px', cursor: 'pointer' }}
                            onClick={() => openShareLink(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`)}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

Share.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Share;
