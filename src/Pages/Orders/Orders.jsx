import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import TitleBar from '../../Components/TitleBar/TitleBar'



const Orders = () => {

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {

        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then((data) => {
                // console.log(data);
                setOrderData(data?.users)
            });
    }, [])


    const columns = [
        {
            name: "id",
            label: "S.No",
            options: {
                filter: true, // Enable filtering for this column
            },
        },
        {
            name: "image",
            label: "Profile",
            options: {
                customBodyRender: (value) => <img src={value} alt='pic' style={{ width: "30px", height: "30px", objectFit: "cover" }} />
            }
        },
        {
            name: "firstName",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "age",
            options: {
                filter: true, // Enable filtering for this column
            },
        },
        {
            name: "gender",
            options: {
                customBodyRender: (value) => <p style={{ textTransform: "uppercase" }}>{value}</p>
            }
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div style={{ display: 'flex', alignItems: "center", gap: "20px" }}>
                            <button
                                style={{ background: '#f2f2f2', cursor: 'pointer', borderRadius: '5px', color: "#111", fontSize: '16px', padding: '5px' }}
                                onClick={() => handleEdit(tableMeta.rowData)}>
                                <i className="bi bi-eye-fill"></i>
                            </button>
                            <button
                                style={{ background: '#f2f2f2', cursor: 'pointer', borderRadius: '5px', color: "#111", fontSize: '16px', padding: '5px' }}
                                onClick={() => handleDelete(tableMeta.rowData)}>
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                        </div>
                    );
                },
            },
        },
    ];


    const handleEdit = (rowData) => {
        // Handle edit action
        console.log("Editing row:", rowData);
    };

    const handleDelete = (rowData) => {
        // Handle delete action
        console.log("Deleting row:", rowData);
    };

    return (
        <div>
            <TitleBar title='Orders' />
            <Table title="Order list" columns={columns} data={orderData} />
        </div>
    )
}

export default Orders