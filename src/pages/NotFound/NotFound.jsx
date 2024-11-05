import React from 'react';
import { Helmet } from 'react-helmet';
import './notFound.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>404 Not Found | Template</title>
            </Helmet>

            <div className="error_boundary">
                <img className="img" src="/not-found.png" alt="not-found" />
                <p>Requested page not found!</p>
                <button className="goToHome" onClick={goToHome}>
                    Go to Home
                </button>
            </div>
        </React.Fragment>
    );
};

export default NotFound;
