import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ClaimsHeader from '../../components/ClaimsHeader/ClaimsHeader';
import ClaimsTab from '../../components/ClaimsTab/ClaimsTab';
import ArchiveModal from '../../components/Modal/ArchiveModal';
import radio from '@icons/white-radio.svg';
import axiosWrapper from '../../utils/api';

import './Claims.scss';

interface Vehicle {
    make: string;
    model: string;
    ownerName: string;
}

interface Claim {
    _id: string;
    company: string;
    claimNumber: string;
    createdAt: string;
    isArchive: boolean;
    vehicle: Vehicle;
}

interface RootState {
    auth: {
        userToken: string;
    };
    theme: {
        activeTab: string;
    };
}

interface ClaimData {
    _id: string;
    company: string;
    claimNumber: string;
    createdAt: string;
    isArchive: boolean;
    status: string;
    vehicle: Vehicle;
}

interface ClaimsTabProps {
    tableData: ClaimData[];
    loading: boolean;
    setTableData: React.Dispatch<React.SetStateAction<ClaimData[]>>;
    setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
    selectedRows: string[];
    activeKey: 'claims' | 'archived';
    afterDelete: (id: string) => void;
    fetchData: () => Promise<void>;
}

interface DataState {
    tableData: ClaimData[];
    loading: boolean;
    selectedRows: string[];
    dataRest: ClaimData[];
}

const Claims: React.FC = () => {
    const [key, setKey] = useState<'claims' | 'archived'>('claims');
    const { userToken } = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState<DataState>({
        tableData: [],
        loading: false,
        selectedRows: [],
        dataRest: []
    });

    const fetchClaims = async (activeKey: string) => {
        if (!userToken || data.loading) return;

        setData((prev) => ({ ...prev, loading: true }));
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim?isDeleted=false`;
            const { data: claimData } = await axiosWrapper<{ data: ClaimData[] }>('get', apiUrl, null, userToken);

            console.log('API Response:', data);

            const filterData = claimData.filter((el) => (activeKey === 'claims' ? !el.isArchive : el.isArchive));

            setData({
                tableData: filterData,
                dataRest: claimData,
                loading: false,
                selectedRows: []
            });
        } catch (error) {
            console.error('Fetch error:', error);
            setData((prev) => ({ ...prev, loading: false }));
            toast.error('Error fetching claims.');
        }
    };

    useEffect(() => {
        if (userToken) {
            fetchClaims(key);
        }
    }, [key, userToken]);

    if (!userToken) return null;

    return <ClaimsContent data={data} setData={setData} activeKey={key} setKey={setKey} userToken={userToken} />;
};

interface ClaimsContentProps {
    data: {
        tableData: ClaimData[];
        loading: boolean;
        selectedRows: string[];
        dataRest: ClaimData[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            tableData: ClaimData[];
            loading: boolean;
            selectedRows: string[];
            dataRest: ClaimData[];
        }>
    >;
    activeKey: string;
    setKey: (key: 'claims' | 'archived') => void;
    userToken: string;
}

const ClaimsContent: React.FC<ClaimsContentProps> = ({ data, setData, activeKey, setKey, userToken }) => {
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [search, setSearch] = useState('');

    const closeArchiveModal = () => setShowArchiveModal(false);
    const openArchiveModal = () => setShowArchiveModal(true);

    const searchHandler = (value: string) => {
        setSearch(value);
        const searchValue = value.toLowerCase();
        const searchResult = data.tableData.filter((el) =>
            [el.company, el.claimNumber, el.createdAt, el.vehicle.ownerName, el.vehicle.make].some((field) =>
                String(field).toLowerCase().includes(searchValue)
            )
        );
        setData((prev) => ({ ...prev, tableData: searchResult }));
    };

    const resetData = () => {
        const filterData = data.dataRest.filter((el) => (activeKey === 'claims' ? !el.isArchive : el.isArchive));
        setData((prev) => ({ ...prev, tableData: filterData }));
        setSearch('');
    };

    const afterDelete = (id: string) => {
        const remainingData = data.dataRest.filter((el) => el._id !== id);
        setData((prev) => ({
            ...prev,
            dataRest: remainingData,
            tableData: remainingData.filter((el) => (activeKey === 'claims' ? !el.isArchive : el.isArchive))
        }));
    };

    const archiveSelectedClaims = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/archives`;
            await axiosWrapper(
                'put',
                apiUrl,
                {
                    ids: data.selectedRows,
                    isArchive: true
                },
                userToken
            );

            const updatedData = data.dataRest.map((claim) =>
                data.selectedRows.includes(claim._id) ? { ...claim, isArchive: true } : claim
            );

            const filterData = updatedData.filter((el) => (activeKey === 'claims' ? !el.isArchive : el.isArchive));

            setData((prev) => ({
                ...prev,
                dataRest: updatedData,
                tableData: filterData,
                selectedRows: []
            }));
            closeArchiveModal();
            toast.dark('Selected claims archived successfully');
        } catch {
            toast.error('Error archiving claims.');
        }
    };

    const claimsTabProps = {
        tableData: data.tableData,
        loading: data.loading,
        setTableData: (newData: ClaimData[]) => setData((prev) => ({ ...prev, tableData: newData })),
        setSelectedRows: (rows: string[]) => setData((prev) => ({ ...prev, selectedRows: rows })),
        selectedRows: data.selectedRows,
        activeKey,
        afterDelete,
        fetchData: () => {} // This will be handled by parent
    };

    return (
        <div className="claims">
            <Container>
                <ClaimsHeader
                    closeArchiveModal={closeArchiveModal}
                    showArchiveModal={showArchiveModal}
                    openArchiveModal={openArchiveModal}
                    searchHandler={searchHandler}
                    search={search}
                    resetData={resetData}
                />
            </Container>

            {data.selectedRows.length > 0 && (
                <div className="archived-section mt-5">
                    <Container>
                        <Row>
                            <Col>
                                <img src={radio} alt="radio" width="15" />
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <button type="button" className="me-3" onClick={openArchiveModal}>
                                    Archive
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}

            <Tabs
                id="controlled-tab-example"
                activeKey={activeKey}
                onSelect={(k) => setKey(k as 'claims' | 'archived')}
                className="mb-3"
            >
                <Tab eventKey="claims" title="Claims">
                    <ClaimsTab {...claimsTabProps} />
                </Tab>
                <Tab eventKey="archived" title="Archived">
                    <ClaimsTab {...claimsTabProps} />
                </Tab>
            </Tabs>

            <ArchiveModal
                closeArchiveModal={closeArchiveModal}
                showArchiveModal={showArchiveModal}
                clickAction={archiveSelectedClaims}
                isClaim
            />
        </div>
    );
};

export default Claims;
