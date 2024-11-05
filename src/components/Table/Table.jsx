import { useEffect, useState, useDeferredValue } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import { InputGroup, Button, Form } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Table.scss';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Table = ({ columns, tableData, width, onRowClicked, createEntry, showCreatebtn, loading }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [search, setSearch] = useState('');

    const defferedSearch = useDeferredValue(search);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    useEffect(() => {
        gridApi?.setQuickFilter(defferedSearch);
        const isDataEmpty = gridApi && gridApi?.getModel()?.getRowCount() === 0;
        if (isDataEmpty) {
            gridApi?.showNoRowsOverlay();
        } else {
            gridApi?.hideOverlay();
        }
    }, [defferedSearch, gridApi]);

    useEffect(() => {
        if (gridColumnApi) {
            gridColumnApi.setColumnPinned();
        }
    }, [gridColumnApi]);

    const onFilterTextChange = (event) => {
        setSearch(event.target.value);
    };

    const gridOptions = {
        domLayout: 'autoHeight',
        suppressAutoSize: true,
        suppressColumnVirtualisation: false,
        suppressPaginationPanel: false,
        overlayLoadingTemplate: Loading,
        embedFullWidthRows: true,
        autoHeight: true,
        suppressRowTransform: true,
        overlayNoRowsTemplate: '<span>No data found</span>'
    };

    return (
        <div className="ag-theme-alpine custom-table" style={{ height: '100%', width: '100%' }}>
            <div style={{ marginBottom: '10px' }} className="d-flex justify-content-between">
                <InputGroup>
                    <Form.Control
                        className="search-input"
                        type="text"
                        name="Search"
                        label="Search"
                        onChange={onFilterTextChange}
                        placeholder="Search..."
                    />
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                </InputGroup>
                {showCreatebtn && <Button onClick={createEntry}>Create</Button>}
            </div>
            <div className="ag-theme-alpine" style={{ width: width ? width : '100%' }}>
                {loading ? (
                    <Loading />
                ) : (
                    <AgGridReact
                        gridOptions={gridOptions}
                        columnDefs={columns}
                        rowData={tableData} // Concatenate empty rows
                        animateRows={true}
                        rowSelection="multiple"
                        sizeRowsToFit
                        onGridReady={onGridReady}
                        loadingOverlayComponent={Loading}
                        onRowClicked={onRowClicked}
                        suppressMenuHide={true}
                        floatingFilter={true}
                        pagination={true}
                        paginationPageSize={10}
                        rowClass="data-table-row"
                        headerClass="data-table-header"
                        suppressCellFocus={true}
                        suppressSizeToFit={true}
                        groupSelectsChildren={true}
                        suppressAggFuncInHeader={true}
                    />
                )}
            </div>
        </div>
    );
};

export default Table;
