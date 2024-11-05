import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa'; // Using react-icons for copy and success icons
import { toast } from 'react-toastify';
import Share from '../../Share/Share';

const ClaimCreated = ({ claimId }) => {
    const [linkText, setLinkText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (claimId) {
            setLinkText(`${import.meta.env.VITE_UI_URL}/${claimId}`);
            setIsLoading(false); // Stop loading when claimId is available
        }
    }, [claimId]);

    const handleCopyClick = () => {
        navigator.clipboard
            .writeText(linkText)
            .then(() => {
                toast.success('Link copied to clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="claim-created mt-2">
            <div>
                <h4>Thank you!</h4>
                <p>You have successfully initiated the claim</p>
            </div>

            <div
                className="for-gap"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                }}
            >
                <FaCheckCircle
                    style={{
                        color: '#FF8C00', // Updated brand color for the success icon
                        fontSize: '80px', // Large icon to replace the GIF
                    }}
                />
            </div>

            <div className="share-div mt-2">
                {/* Display link text or a loading indicator */}
                {!isLoading ? (
                    <div className="copy-div" style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCopy
                            onClick={handleCopyClick}
                            style={{
                                cursor: 'pointer',
                                color: '#FF8C00', // Updated brand color for the copy icon
                                marginRight: '10px',
                                fontSize: '20px',
                            }}
                        />
                        <p
                            style={{
                                margin: '0',
                                fontWeight: 'bold',
                                color: '#171717', // Dark color for the link text
                                fontSize: '14px', // Reduced font size for the link text
                                textDecoration: 'none', // No underline
                                cursor: 'pointer', // Let it look clickable
                                wordBreak: 'break-all', // Ensure long URLs break properly in mobile view
                            }}
                            onClick={() => window.open(linkText, '_blank')}
                        >
                            {linkText}
                        </p>
                    </div>
                ) : (
                    <p style={{ color: '#FF8C00' }}>Generating claim URL...</p>
                )}

                {/* Share Component */}
                <div>
                    <Share url={linkText} title="OBA-AI" text="Claim Url: " />
                </div>
            </div>
        </div>
    );
};

export default ClaimCreated;
