import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import './ConfirmationBox.scss';
import Loading from '../Loading/Loading';

const ConfirmationBox = ({ show, onClose, onConfirm, title, body, loading }) => {
    return (
        <Modal show={show} onHide={onClose} centered className="confirmation-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button
                    className="custom-button"
                    disabled={loading}
                    onClick={onClose}
                    style={{
                        backgroundColor: 'transparent', // No background for 'No' button
                        color: '#FF8C00', // New brand color
                        border: '2px solid #FF8C00', // Border with brand color
                        minWidth: '100px',
                        height: '35px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    No
                </Button>
                <Button
                    className="custom-button"
                    disabled={loading}
                    onClick={onConfirm}
                    style={{
                        backgroundColor: '#FF5F1E', // New brand color for 'Yes' button
                        color: 'white',
                        border: 'none',
                        minWidth: '100px',
                        height: '35px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {loading ? <Loading size="sm" /> : 'Yes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ConfirmationBox.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default ConfirmationBox;
