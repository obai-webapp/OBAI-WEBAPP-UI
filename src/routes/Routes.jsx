import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import ContactUs from '../pages/ContactUs/ContactUs';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import OtpScreen from '../pages/Auth/OtpScreen';
import ClaimWrapper from '../pages/ClaimWrapper/ClaimWrapper';
import LandingPage from '../pages/LandingPage/LandingPage';
import UpdatePassword from '../pages/Auth/UpdatePassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

// Lazy load the components for code splitting
const ViewClaims = lazy(() => import('../pages/ViewClaims/ViewClaims'));
const Login = lazy(() => import('@pages/Auth/Login'));
const Claims = lazy(() => import('@pages/Claims/Claims'));
const CreateClaim = lazy(() => import('@pages/CreateClaim/CreateClaim'));
const HowItWorks = lazy(() => import('@pages/HowItWorks/HowItWorks'));
const MainStepper = lazy(() => import('@pages/MainStepper/MainStepper'));
const QualityCheck = lazy(() => import('@pages/QualityCheck/QualityCheck'));
const VinQualityCheck = lazy(() => import('@components/StepperChilds/VinStep/VinQualityCheck/VinQualityCheck'));
const OdometerQualityCheck = lazy(() => import('@components/StepperChilds/OdometerStep/OdometerQualityCheck/OdometerQualityCheck'));
const ClaimSubmitted = lazy(() => import('@pages/ClaimSubmitted/ClaimSubmitted'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

const MainRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);  // Get auth status from Redux state
    const isLoading = useSelector((state) => state.auth.isLoading); // Add a loading state if available

    // Fallback loader during lazy loading of components
    const FallbackLoader = () => (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border" role="status" style={{ color: 'rgb(255,163,0)' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (isLoading) {
        return <FallbackLoader />;  // You can show a loading spinner here
    }

    return (
        <Suspense fallback={<FallbackLoader />}>
            <Routes>
                {/* Public routes that do not require authentication */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp-screen" element={<OtpScreen />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/:claimID" element={<ClaimWrapper />} />  {/* Publicly accessible claims route */}
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
                    // Redirect all unauthenticated routes to the login page
                    <Route path="*" element={<Navigate to="/admin-login" />} />
                )}
            </Routes>
        </Suspense>
    );
};

export default MainRoutes;
