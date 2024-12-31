import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../../components/RadioButton/RadioButton';
import './ClaimsTab.scss';
import { useDispatch, useSelector } from 'react-redux';
import axiosWrapper from '../../utils/api';
import { format } from 'date-fns';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import { setActiveTab } from '../../redux/theme/themeSlice';

// import deleteIcon from '@icons/del.svg';
// import copy from '@icons/copy.svg';

interface ClaimsTabProps {
    setSelectedRows: (rows: string[]) => void;
    setTableData: (data: any[]) => void;
    tableData: ClaimData[];
    fetchData: () => void;
    loading: boolean;
    afterDelete: (id: string) => void;
    activeKey: string;
}

interface ClaimData {
    _id: string;
    claimNumber: string;
    company: string;
    vehicle: {
        make: string;
        model: string;
        ownerName: string;
    };
    createdAt: string;
    status: string;
}

interface FormattedClaimData {
    id: string;
    claim: string;
    insurance: string;
    vehicle: string;
    vehicleOwner: string;
    createdOn: string;
    status: string;
}

const ClaimsTab: React.FC<ClaimsTabProps> = ({
    setSelectedRows,
    tableData,
    fetchData,
    loading,
    afterDelete,
    activeKey
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userToken = useSelector((state: any) => state?.auth?.userToken);

    const [deleteModal, setDeleteModal] = useState(false);
    const [claimToDelete, setClaimToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (activeKey === 'claims' || activeKey === 'archived') {
            fetchData();
        }
    }, [activeKey, fetchData]);

    const closeDeleteModal = () => setDeleteModal(false);

    const showDeleteModal = (claimId: string) => {
        setClaimToDelete(claimId);
        setDeleteModal(true);
    };

    const handleCopyClick = (rowData: FormattedClaimData) => {
        navigator.clipboard
            .writeText(`${import.meta.env.VITE_UI_URL}/${rowData.id}`)
            .then(() => toast.success('Link copied to clipboard'))
            .catch((err) => console.error('Failed to copy:', err));
    };

    const getClaimById = async (id: string) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/${id}`;
            await axiosWrapper('get', apiUrl, null, userToken);
            dispatch(setActiveTab(activeKey));
            navigate(`/view-claims/${id}`);
        } catch (error) {
            toast.error('Error fetching claim data');
            console.error(error);
        }
    };

    const deleteClaim = async (id: string) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/${id}`;
            await axiosWrapper('delete', apiUrl, null, userToken);
            setClaimToDelete(null);
            closeDeleteModal();
            toast.success('Claim deleted successfully');
            afterDelete(id);
        } catch (error) {
            toast.error('Error deleting claim');
            console.error('Error deleting claim:', error);
        }
    };

    const columns: TableColumn<FormattedClaimData>[] = [
        {
            name: 'Claim Number',
            selector: (row) => row.claim,
            sortable: true
        },
        {
            name: 'Insurance',
            selector: (row) => row.insurance,
            sortable: true
        },
        {
            name: 'Vehicle',
            selector: (row) => row.vehicle,
            sortable: true
        },
        {
            name: 'Owner',
            selector: (row) => row.vehicleOwner,
            sortable: true
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true
        },
        {
            name: 'Created On',
            selector: (row) => row.createdOn,
            sortable: true
        }
    ];

    const formattedData: FormattedClaimData[] = tableData.map((item) => ({
        id: item._id,
        claim: item.claimNumber || '',
        insurance: item.company || '',
        vehicle: `${item.vehicle?.make || ''}${item.vehicle?.make && item.vehicle?.model ? ', ' : ''}${
            item.vehicle?.model || ''
        }`,
        vehicleOwner: item.vehicle?.ownerName || '',
        createdOn: format(new Date(item.createdAt), 'MM/dd/yyyy'),
        status: item.status
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
                border: 'none !important'
            }
        },
        headCells: {
            style: {
                color: '#F25C22',
                fontWeight: '700',
                background: 'transparent',
                fontFamily: 'Lato, sans-serif',
                fontSize: '18px',
                border: 'none !important'
            }
        },
        cells: {
            style: {
                color: '#101C85',
                background: 'transparent',
                border: 'none !important',
                cursor: 'pointer'
            }
        }
    };

    const handleChange = ({ selectedRows }: { selectedRows: FormattedClaimData[] }) => {
        setSelectedRows(selectedRows.map((row) => row.id));
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : tableData.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <p style={{ color: '#F25C22', fontWeight: 300, margin: 0 }}>No data found</p>
                </div>
            ) : (
                <div className="mt-3 data-table-custom">
                    <DataTable
                        columns={columns}
                        data={formattedData}
                        dense
                        responsive
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                        customStyles={customStyles}
                        theme="solarized"
                        onRowClicked={(row) => getClaimById(row.id)}
                        selectableRowsComponent={React.createElement(RadioButton)}
                        onSelectedRowsChange={handleChange}
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
