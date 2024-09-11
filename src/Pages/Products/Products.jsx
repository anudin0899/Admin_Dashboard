import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import TitleBar from '../../Components/TitleBar/TitleBar'
import ProductFromModel from '../../Components/Model/ProductFormModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../Actions/category.action';
import DetailModel from '../../Components/Details/DetailModel';



const Products = () => {

    // const dispatch = useDispatch();
    const categoriesState = useSelector(state => state.category);
    const productState = useSelector(state => state.product)

    const [open, setOpen] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     dispatch(getAllCategory());
    // }, [])

    // -- Fetching categoy data to pass into the form
    const createCategoryList = (categories, option = []) => {
        for (let cat of categories) {
            option.push({ value: cat._id, name: cat.name });
            if (cat.children.length > 0) {
                createCategoryList(cat.children, option);
            }
        }
        return option;
    }

    // -- Fetching categoy data to pass into the table
    useEffect(() => {
        if (categoriesState.categories) {
            const options = createCategoryList(categoriesState.categories); // Assuming createCategoryList is defined
            setCategoryOptions(options);
        }
    }, [categoriesState.categories]);



    const columns = [


        {
            name: "name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "quantity",
            options: {
                filter: true, // Enable filtering for this column
            },
        },
        {
            name: "price",
            options: {
                filter: true, // Enable filtering for this column
            },
        },
        {
            name: "description",
            options: {
                filter: true, // Enable filtering for this column
            },
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
                                onClick={() => handleView(tableMeta.tableData, tableMeta.rowIndex,tableMeta.rowData)}>
                                <i className="bi bi-eye-fill"></i>
                            </button>
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

    const handleView = (tableData, rowIndex,rowData) => {
        // Handle edit action
        setShow(true);
        setData(tableData[rowIndex])
    };
    console.log("Editing row:", data);

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
            <TitleBar title='Products' toggle={() => setOpen(true)} />
            <Table title="Product list" columns={columns} data={productState.products} />
            {open &&
                <ProductFromModel
                    toggle={() => setOpen(false)}
                    selectOptions={categoryOptions}
                />
            }
            {show &&
                <DetailModel
                    toggle={() => setShow(false)}
                    data={data}
                />
            }
        </div>
    )
}

export default Products