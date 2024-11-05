import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../../components/RadioButton/RadioButton';
import './ClaimsTab.scss';
import deleteIcon from '@icons/del.svg';
import { useDispatch, useSelector } from 'react-redux';
import axiosWrapper from '../../utils/api';
import { format } from 'date-fns';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import copy from '@icons/copy.svg';
import { setActiveTab } from '../../redux/theme/theme_slice';

const ClaimsTab = ({ setSelectedRows, setTableData, tableData, fetchData, loading, afterDelete, activeKey }) => {
    const navigate = useNavigate();
    const { userToken } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const [deleteModal, setDeleteModal] = useState(false);
    const [claimToDelete, setClaimToDelete] = useState(null);

    useEffect(() => {
        // Fetch data based on activeKey (claims or archived)
        if (activeKey === 'claims' || activeKey === 'archived') {
            fetchData(); // Always call the parent fetch function which will handle the filter logic
        }
    }, [activeKey]);

    const closeDeleteModal = () => setDeleteModal(false);

    const showDeleteModal = (claimId) => {
        setClaimToDelete(claimId);
        setDeleteModal(true);
    };

    const handleCopyClick = (rowData) => () => {
        navigator.clipboard
            .writeText(`${import.meta.env.VITE_UI_URL}/${rowData?.id}`)
            .then(() => {
                toast.success('Link copied to clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    const getClaimById = async (id) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/${id}`;
            const { data } = await axiosWrapper('get', apiUrl, null, userToken);
            dispatch(setActiveTab(activeKey));
            navigate(`/view-claims/${id}`);
        } catch (error) {
            toast.error('Error fetching claim data');
            console.error(error);
        }
    };

    const deleteClaim = async (id) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/${id}`;
            await axiosWrapper('delete', apiUrl, null, userToken);
            setClaimToDelete(null);
            closeDeleteModal();
            toast.success('Claim deleted successfully');
            afterDelete(id);
        } catch (error) {
            console.error('Error deleting claim:', error);
        }
    };

    const columns = [
        // Your existing columns logic here
        {
            name: 'Claim Number',
            selector: (row) => row.claim,
            sortable: true,
        },
        {
            name: 'Insurance',
            selector: (row) => row.insurance,
            sortable: true,
        },
        {
            name: 'Vehicle',
            selector: (row) => row.vehicle,
            sortable: true,
        },
        {
            name: 'Owner',
            selector: (row) => row.vehicleOwner,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: 'Created On',
            selector: (row) => row.createdOn,
            sortable: true,
        },
    ];

    const formattedData = tableData?.map((item) => ({
        id: item?._id,
        claim: item?.claimNumber || '',
        insurance: item?.company || '',
        vehicle: `${item?.vehicle?.make || ''}${item?.vehicle?.make && item?.vehicle?.model ? ', ' : ''}${item?.vehicle?.model || ''}`,
        vehicleOwner: item?.vehicle?.ownerName || '',
        createdOn: format(new Date(item?.createdAt), 'MM/dd/yyyy'),
        status: item?.status,
    }));

    const customStyles = {
        rows: {
            style: {
                color: '#101C85',
                fontFamily: 'Lato, sans-serif',
                fontWeight: '500',
                fontSize: '14px',
                minHeight: '54px !important',
                cursor: 'pointer',
                border: 'none !important',
            },
        },
        headCells: {
            style: {
                color: '#F25C22',
                fontWeight: '700',
                background: 'transparent',
                fontFamily: 'Lato, sans-serif', // Fixed typo here
                fontSize: '18px',
                border: 'none !important',
                minHeight: '54px !important',
            },
        },
        cells: {
            style: {
                color: '#101C85',
                background: 'transparent',
                border: 'none !important',
                cursor: 'pointer',
                marginTop: '10px',
            },
        },
    };

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows.map((row) => row.id));
    };

    const sortHandler = (rows, selector, direction) => {
        const newSortList = rows.sort((a, b) => {
            const aField = selector(a).props.children.toLowerCase();
            const bField = selector(b).props.children.toLowerCase();

            let comparison = 0;

            if (aField > bField) {
                comparison = 1;
            } else if (aField < bField) {
                comparison = -1;
            }

            return direction === 'desc' ? comparison * -1 : comparison;
        });

        return newSortList;
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : tableData?.length <= 0 ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <p style={{ color: '#F25C22', fontWeight: '300', marginBlock: 0 }}>No data found</p>
                </div>
            ) : (
                <div className="mt-3 data-table-custom">
                    <DataTable
                        columns={columns}
                        data={formattedData}
                        dense={true}
                        responsive={true}
                        pagination={true}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                        customStyles={customStyles}
                        theme="solarized"
                        onRowClicked={(row) => getClaimById(row?.id)}
                        selectableRowsComponent={RadioButton}
                        onSelectedRowsChange={handleChange}
                        sortFunction={sortHandler}
                        selectableRows={activeKey === 'claims'}
                    />
                </div>
            )}
            <DeleteModal
                deleteModal={deleteModal}
                closeDeleteModal={closeDeleteModal}
                deleteClaim={deleteClaim}
                claimId={claimToDelete}
            />
        </>
    );
};

export default ClaimsTab;
