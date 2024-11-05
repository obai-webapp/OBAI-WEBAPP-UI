import { Spinner } from 'react-bootstrap';

const Loading = ({ centered = false, size = 'md', color = '#FF8C00' }) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={centered ? { height: '100vh' } : null}>
            <Spinner animation="border" role="status" size={size} style={{ color }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;
