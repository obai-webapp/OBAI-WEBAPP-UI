import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './ClaimsHeader.scss';

interface ClaimsHeaderProps {
    searchHandler: (value: string) => void;
    search: string;
    resetData: () => void;
    closeArchiveModal: () => void;
    showArchiveModal: boolean;
    openArchiveModal: () => void;
}

const ClaimsHeader: React.FC<ClaimsHeaderProps> = ({ searchHandler, search, resetData }) => {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setSearchVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSearchVisible && searchRef.current) {
            const input = searchRef.current.querySelector('input');
            input?.focus();
        }
    }, [isSearchVisible]);

    return (
        <div className="claim-header">
            <div>
                <h4>Claims</h4>
            </div>

            <Row className="w-100 m-0 align-items-center mt-4">
                <Col className="p-0">
                    <div>
                        <div
                            className="search-icon"
                            onClick={toggleSearch}
                            style={{ display: isSearchVisible ? 'none' : 'block' }}
                        >
                            <FontAwesomeIcon icon={faSearch} size="lg" color="#FF8C00" />
                        </div>
                        {isSearchVisible && (
                            <div className="search-field" ref={searchRef}>
                                <div className="search-icon2" onClick={toggleSearch}>
                                    <FontAwesomeIcon icon={faSearch} size="lg" color="#FF8C00" />
                                </div>
                                <div className="w-100">
                                    <input
                                        type="search"
                                        id="gsearch"
                                        name="gsearch"
                                        placeholder="Search"
                                        onChange={(e) => searchHandler(e.target.value)}
                                        value={search}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
                <Col className="create-btn">
                    <button type="button" onClick={() => navigate('/create-claim')}>
                        Create
                        <p>+</p>
                    </button>
                </Col>
            </Row>
        </div>
    );
};

export default ClaimsHeader;
