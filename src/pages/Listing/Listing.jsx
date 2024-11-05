import React, { useEffect, useState } from 'react';
import Table from '@components/Table/Table';
import { Col, Row } from 'react-bootstrap';
import Modal from '@components/Modal/Modal';
import ProductForm from '@components/Listings/ProductForm/ProductForm';
import ConfirmationBox from '@components/ConfirmationBox/ConfirmationBox';
import { Helmet } from 'react-helmet';
import { formatDate } from '../../utils/common';
import axiosWrapper from '@utils/api';
import { toast } from 'react-toastify';
import TextExpand from '@components/TextExpand/TextExpand';
import editIcon from '@icons/edit.svg';
import deleteIcon from '@icons/delete.svg';
import './Listing.scss';

const Listing = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [productModal, setProductModal] = useState({
        show: false,
        title: '',
        isEditable: false,
        productId: null
    });
    const [loading, setLoading] = useState(false);
    const [loadingCRUD, setLoadingCRUD] = useState(false);

    const [productData, setProductData] = useState(null);

    useEffect(() => {
        // Fetch data from API here
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await axiosWrapper('get', `${import.meta.env.VITE_JSONPLACEHOLDER}/posts`);
            const updatedData = data.map((item) => {
                return { ...item, createdAt: new Date() };
            });
            setProductData(updatedData);
        } catch (error) {
            return;
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (event) => {
        // Handle row click event here
        if (selectedRowId === event.data.id) {
            setSelectedRowId(null);
            return;
        }
        setSelectedRowId(event.data.id);
    };

    const handleCreateClick = () => {
        // Handle create button click event here
        setProductModal({
            show: true,
            title: 'Create Product',
            isEditable: false,
            productId: null
        });
    };

    const handleEditClick = (productId) => {
        // Handle edit action here
        setProductModal({
            show: true,
            title: 'Edit Product',
            isEditable: true,
            productId: productId
        });
    };

    const handleDeleteClick = (id) => {
        // Handle delete action here
        setSelectedRowId(id);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        resetProductModal();
    };

    const resetProductModal = () => {
        setProductModal({
            show: false,
            title: '',
            isEditable: false,
            productId: null
        });
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = async () => {
        try {
            setLoadingCRUD(true);
            const data = await axiosWrapper(
                'delete',
                `${import.meta.env.VITE_JSONPLACEHOLDER}/posts/${selectedRowId}}`
            );
            toast.success(data?.message || 'Item deleted successfully');
        } catch (error) {
            return;
        } finally {
            setLoadingCRUD(false);
            setShowDeleteModal(false);
        }
    };

    /*eslint-disable */
    const ActionsRenderer = (props) => (
        <React.Fragment>
            <Row style={{ width: '100%' }}>
                <Col lg={6} md={6} sm={6} className="d-flex justify-content-center align-items-center">
                    <button className="action-button edit-button" onClick={() => props.onEditClick(props.data.id)}>
                        <img src={editIcon} className="action-icon" alt="action-icon" />
                    </button>
                </Col>
                <Col lg={6} md={6} sm={6} className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn-light action-button delete-button"
                        onClick={() => props.onDeleteClick(props.data.id)}
                    >
                        <img src={deleteIcon} className="action-icon" alt="action-icon" />
                    </button>
                </Col>
            </Row>
        </React.Fragment>
    );
    /*eslint-disable */

    const columns = [
        { headerName: 'ID', field: 'id', sortable: true, unSortIcon: true },
        { headerName: 'User ID', field: 'id', filter: 'agNumberColumnFilter', sortable: true, unSortIcon: true },
        {
            headerName: 'Title',
            field: 'title',
            filter: 'agSetColumnFilter',
            sortable: true,
            unSortIcon: true,
            width: 200,
            wrapText: true,
            autoHeight: true,
            cellRenderer: TextExpand
        },
        {
            headerName: 'Description',
            field: 'body',
            filter: 'agSetColumnFilter',
            sortable: true,
            unSortIcon: true,
            width: 300,
            wrapText: true,
            autoHeight: true,
            cellRenderer: TextExpand
        },
        {
            headerName: 'Created at',
            field: 'createdAt',
            filter: 'agSetColumnFilter',
            sortable: true,
            unSortIcon: true,
            cellRenderer: (params) => formatDate(params.value)
        },
        {
            headerName: 'Actions',
            cellRenderer: ActionsRenderer,
            cellRendererParams: {
                onEditClick: handleEditClick,
                onDeleteClick: handleDeleteClick
            },
            pinned: 'right',
            maxWidth: 150,
            sortable: false,
            filter: false,
            cellClass: ['d-flex', 'align-items-center']
        }
    ];

    return (
        <div className="listing-page">
            <Helmet>
                <title>Products | Template</title>
            </Helmet>
            {productModal.show && (
                <Modal size="large" show={productModal.show} onClose={handleCloseModal} title={productModal.title}>
                    <ProductForm productModal={productModal} resetModal={resetProductModal} />
                </Modal>
            )}
            {showDeleteModal && (
                <ConfirmationBox
                    show={showDeleteModal}
                    onClose={handleCloseDeleteModal}
                    loading={loadingCRUD}
                    title="Delete Entry"
                    body="Are you sure you want to delete this entry?"
                    onConfirm={handleDeleteSubmit}
                />
            )}
            <h3>Product Listing Page</h3>
            <Table
                columns={columns}
                tableData={productData}
                onRowClicked={handleRowClick}
                createEntry={handleCreateClick}
                showCreatebtn={true}
                loading={loading}
            />
        </div>
    );
};

export default Listing;
