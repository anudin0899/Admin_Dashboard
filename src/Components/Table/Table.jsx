import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Table = ({ columns, data, title, popup, onDataReceived, delPopup, onDelete }) => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowsData, setSelectedRowsData] = useState([]);


    const options = {

        selectableRows: "single", // "none"
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15, 20],

        draggableColumns: {
            enabled: true,
            transitionTime: 300
        },
        selectableRowsOnClick: true,
        responsive: 'standard',
        confirmFilters: true,
        fixedSelectColumn: true,
        rowsSelected: selectedRows, // Removed duplicate entry


        onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
            const selectedRowIndexes = allRowsSelected.map(row => row.dataIndex);
            const selectedRows = selectedRowIndexes.map(index => data[index]);
            setSelectedRows(selectedRowIndexes);
            setSelectedRowsData(selectedRows);
        },

        customToolbarSelect: () => (
            <CustomToolbarSelect
                handleDelete={() => handleDelete(selectedRowsData, setSelectedRows)}
                handleEdit={() => handleEdit(selectedRowsData, setSelectedRows)}
            />

        ),

        // onRowsDelete: (rowsDeleted) => {
        //     const indices = rowsDeleted.data.map(row => row.index);
        //     console.log("deleted");

        //     // Filter out the selected rows
        //     const newData = data.filter((_, index) => !indices.includes(index));
        //     setDatas(newData);
        //     setSelectedRows([]);
        // },


        // caseSensitive: true,
        // fixedHeader: true,
        // filter: true,
        // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        //     <CustomToolbarSelect selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
        // ),


    };

    const CustomToolbarSelect = ({ handleDelete, handleEdit }) => (
        <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "25px", }}>

            <button
                variant="contained"
                color="error"
                onClick={handleEdit}
            >
                <i style={{ fontSize: "14px", cursor: "pointer", background: "#fff !important" }} className="bi bi-pencil-fill"></i>
            </button>

            <button
                variant="contained"
                color="error"
                onClick={handleDelete}
            >
                <i style={{ fontSize: "14px", cursor: "pointer", background: "#fff !important" }} className="bi bi-trash3-fill"></i>
            </button>

        </div>
    );

    const handleDelete = (selectedRows, setSelectedRows) => {
        delPopup();
        onDelete(selectedRows)
        setSelectedRows([]);
    };

    const handleEdit = (selectedRows, setSelectedRows) => {
        popup();
        onDataReceived(selectedRows)
        setSelectedRows([]);
    };





    const getMuiTheme = () => createTheme({
        typography: {
            fontFamily: "Arial",
        },
        palette: {
            mode: "light",
        },
        components: {

            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        "&.Mui-checked": {
                            "color": "#111"
                        }
                    }
                },
            },



            MuiTableCell: {
                styleOverrides: {
                    head: {
                        padding: "8px 4px",
                        background: '#111',
                        color: "#fff",
                        '& .MuiCheckbox-root': {
                            color: '#fff', // Change the color of the header checkbox
                        },
                        '& .MuiCheckbox-root.Mui-checked': {
                            color: '#fff', // Change the color when the header checkbox is checked
                        },
                        '& .MuiCheckbox-root.MuiCheckbox-indeterminate': {
                            color: '#fff', // Change the color of the indeterminate icon
                        },


                        '& .MuiTableSortLabel-root': {
                            color: '#fff', // Default header text color
                            '&.MuiTableSortLabel-active': {
                                color: '#fff', // Active (sorted) header text color
                            },
                        },

                        '& .MuiTableSortLabel-icon': {
                            color: '#fff', // Default sorting icon color
                            '&.MuiTableSortLabel-iconDirectionAsc': {
                                color: '#fff', // Ascending sort icon color
                            },
                            '&.MuiTableSortLabel-iconDirectionDesc': {
                                color: '#fff', // Descending sort icon color
                            },
                        },

                    },
                    body: {
                        background: '#fff',
                        color: "#111"
                    },
                    footer: {
                        background: '#fff',
                        color: "#fff",
                    }
                }
            },

            MuiToolbar: {
                styleOverrides: {
                    root: {
                        background: '#fff',
                        color: "#111", // Text color for toolbar
                        borderBottom: "1px solid #fff", // Bottom border for toolbar
                    }
                }
            },
            MUIDataTable: {
                styleOverrides: {
                    root: {
                        color: '#fff',
                        borderRadius: 20, // Border radius for the table
                        overflow: 'hidden', // Ensure content within table does not overflow
                    }
                }
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={title}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    );
};

export default Table;
