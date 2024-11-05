import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, MainPanel } from '@components/Dashboard';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
const DashboardLayout = () => {
    const { isLoggedIn } = useSelector((state) => state?.auth);
    const navigate = useNavigate();

    return (
        <Container fluid className="p-0">
            {/* Collapsible Sidebar */}
            {/* Main Content */}
            <Suspense fallback={<Loading centered />}>
                <MainPanel>
                    <Outlet />
                </MainPanel>
            </Suspense>
        </Container>
    );
};

export default DashboardLayout;
