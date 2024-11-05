import React, { useEffect, useState } from 'react';
import ClaimsHeader from '../../components/ClaimsHeader/ClaimsHeader';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import './Claims.scss';
import ClaimsTab from '../../components/ClaimsTab/ClaimsTab';
import ArchiveModal from '../../components/Modal/ArchiveModal/ArchiveModal';
import radio from '@icons/white-radio.svg';
import axiosWrapper from '../../utils/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Claims = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [key, setKey] = useState('claims'); // Set default to "claims"
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [dataRest, setData] = useState([]);
    const { userToken } = useSelector((state) => state?.auth);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const { activeTab } = useSelector((state) => state.theme);

    const closeArchiveModal = () => setShowArchiveModal(false);
    const openArchiveModal = () => setShowArchiveModal(true);

    // Fetch all claims (API)
    const fetchData = async () => {
        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim?isDeleted=false`;
            const { data } = await axiosWrapper('get', apiUrl, null, userToken);

            // Check if "key" is "claims" or "archived" to filter data properly
            const filterData = data?.length
                ? data.filter((el) => (key === 'claims' ? !el.isArchive : el.isArchive))
                : [];

            setTableData(filterData);
            setData(data);
        } catch (error) {
            toast.error('Error fetching claims.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch data when the "key" changes
        if (userToken) {
            fetchData();  // Only fetch data if the userToken is available
        }
    }, [key, userToken]); // Only re-fetch when `key` or `userToken` changes

    // Archive selected claims (API)
    const archiveSelectedClaims = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/claim/archives`;
            await axiosWrapper('put', apiUrl, { ids: selectedRows, isArchive: true }, userToken);

            const updatedData = [...dataRest];
            selectedRows.forEach((item) => {
                const index = updatedData.findIndex((el) => el._id === item);
                if (index > -1) {
                    updatedData[index].isArchive = true;
                }
            });

            const filterData = updatedData?.length
                ? updatedData.filter((el) => (key === 'claims' ? !el.isArchive : el.isArchive))
                : [];

            setData(updatedData);
            setTableData(filterData);
            closeArchiveModal();
            toast.dark('Selected claims archived successfully');
            setSelectedRows([]);
        } catch (error) {
            toast.error('Error archiving claims.');
        }
    };

    // Search functionality
    const searchHandler = (value) => {
        setSearch(value);
        const searchResult = tableData.filter(
            (el) =>
                String(el.company).toLowerCase().includes(value.toLowerCase()) ||
                String(el.claimNumber).toLowerCase().includes(value.toLowerCase()) ||
                String(el.createdAt).toLowerCase().includes(value.toLowerCase()) ||
                String(el?.vehicle.ownerName).toLowerCase().includes(value.toLowerCase()) ||
                String(el?.vehicle.make).toLowerCase().includes(value.toLowerCase())
        );
        setTableData(searchResult);
    };

    const resetData = () => {
        const filterData = dataRest.filter((el) => (key === 'claims' ? !el.isArchive : el.isArchive));
        setTableData(filterData);
        setSearch('');
    };

    const afterDelete = (id) => {
        const remainingData = dataRest.filter((el) => el._id !== id);
        setData(remainingData);
        setTableData(remainingData.filter((el) => (key === 'claims' ? !el.isArchive : el.isArchive)));
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

            {selectedRows.length > 0 && (
                <div className="archived-section mt-5">
                    <Container>
                        <Row>
                            <Col>
                                <img src={radio} alt="radio" width="15px" />
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

            {/* Ensure that switching between tabs properly sets the "key" state */}
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}  // Properly update the "key" when switching tabs
                className="mb-3"
            >
                <Tab eventKey="claims" title="Claims">
                    <ClaimsTab
                        tableData={tableData}
                        loading={loading}
                        setTableData={setTableData}
                        setSelectedRows={setSelectedRows}
                        selectedRows={selectedRows}
                        activeKey={key}
                        afterDelete={afterDelete}
                        fetchData={fetchData}
                    />
                </Tab>
                <Tab eventKey="archived" title="Archived">
                    <ClaimsTab
                        tableData={tableData}
                        loading={loading}
                        setTableData={setTableData}
                        setSelectedRows={setSelectedRows}
                        selectedRows={selectedRows}
                        activeKey={key}
                        afterDelete={afterDelete}
                        fetchData={fetchData}
                    />
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
