import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { Container } from 'react-bootstrap';
import axiosWrapper from '../../utils/api';
import './publicLayout.scss';

const PublicLayout = () => {
    const { claimID } = useParams();

    const [isClaimExist, setIsClaimExist] = useState(true);
    const [claim, setClaim] = useState({ status: 'PENDING' });

    const fetchInitialData = async () => {
        try {
            const { data } = await axiosWrapper('get', `${import.meta.env.VITE_API_URL}/api/claim/${claimID}`);
            setIsClaimExist(data?._id ? true : false);
            setClaim(data);
        } catch (error) {
            setIsClaimExist(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <React.Fragment>
            <Suspense fallback={<Loading centered />}>
                <Container>
                    {isClaimExist ? (
                        claim?.status === 'PENDING' ? (
                            <Outlet />
                        ) : (
                            <div className="claim_notFound">
                                <h1 className="lato-bold ">
                                    Claim was <span style={{ color: '#c200ff' }}> {claim?.status} </span>
                                </h1>
                            </div>
                        )
                    ) : (
                        <div className="claim_notFound">
                            <h1 className="lato-bold ">Claim not found</h1>
                        </div>
                    )}
                </Container>
            </Suspense>
        </React.Fragment>
    );
};

export default PublicLayout;
