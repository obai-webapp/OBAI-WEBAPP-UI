import React from 'react';
import { Container } from 'react-bootstrap';
import { Sidebar, MainPanel } from '../../components/Dashboard';

import '../../App.scss';

const Dashboard = () => {
    return (
        <React.Fragment>
            <Container fluid className="p-0">
                <div className="wrapper">
                    {/* Collapsible Sidebar */}
                    <Sidebar />
                    {/* Main Content */}
                    <MainPanel />
                </div>
            </Container>
        </React.Fragment>
    );
};

export default Dashboard;
