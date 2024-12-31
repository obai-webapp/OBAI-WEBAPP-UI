import React, { lazy, Suspense, FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import ContactUs from '../pages/ContactUs/ContactUs';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import OtpScreen from '../pages/Auth/OtpScreen';
import ClaimWrapper from '../pages/ClaimWrapper/ClaimWrapper';
import LandingPage from '../pages/LandingPage/LandingPage';
import UpdatePassword from '../pages/Auth/UpdatePassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootState } from '../redux/store';

// Lazy load the components for code splitting
const ViewClaims = lazy(() => import('../pages/ViewClaims/ViewClaims'));
const Login = lazy(() => import('@pages/Auth/Login'));
const Claims = lazy(() => import('@pages/Claims/Claims'));
const CreateClaim = lazy(() => import('@pages/CreateClaim/CreateClaim'));
const HowItWorks = lazy(() => import('@pages/HowItWorks/HowItWorks'));
const MainStepper = lazy(() => import('@pages/MainStepper/MainStepper'));
const QualityCheck = lazy(() => import('@pages/QualityCheck/QualityCheck'));
const VinQualityCheck = lazy(() => import('@components/StepperChilds/VinStep/VinQualityCheck/VinQualityCheck'));
const OdometerQualityCheck = lazy(
    () => import('@components/StepperChilds/OdometerStep/OdometerQualityCheck/OdometerQualityCheck')
);
const ClaimSubmitted = lazy(() => import('@pages/ClaimSubmitted/ClaimSubmitted'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

const FallbackLoader: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status" style={{ color: 'rgb(255,163,0)' }}>
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

const MainRoutes: FC = () => {
    // Get auth status and loading state from Redux
    const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

    if (loading) {
        return <FallbackLoader />;
    }

    return (
        <Suspense fallback={<FallbackLoader />}>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp-screen" element={<OtpScreen />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/:claimID" element={<ClaimWrapper />} />
                <Route path="/admin-login" element={<Login />} />

                {/* Protected routes */}
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<DashboardLayout />}>
                            <Route index element={<Claims />} />
                            <Route path="claims" element={<Claims />} />
                            <Route path="view-claims/:id" element={<ViewClaims />} />
                            <Route path="create-claim" element={<CreateClaim />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/admin-login" replace />} />
                )}
            </Routes>
        </Suspense>
    );
};

export default MainRoutes;
