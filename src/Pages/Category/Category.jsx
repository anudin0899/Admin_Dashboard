import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import TitleBar from '../../Components/TitleBar/TitleBar'
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategory, updateCategory } from '../../Actions/category.action';
import CategoryFromModel from '../../Components/Model/CategoryFormModel';
import Popup from '../../Components/Popup/Popup';
import ConfirmPopup from '../../Components/Popup/ConfirmPopup';





const Category = () => {

    const categoriesState = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [delPopupOpen, setDelPopupOpen] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const [id, setId] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [parentId, setParentId] = useState(null);
    const [parentName, setParentName] = useState(null);
    const [type, setType] = useState(null);


    useEffect(() => {
        dispatch(getAllCategory());
    }, [popupOpen])

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    id: category._id,
                    Name: category.name,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    function flattenCategories(categories) {
        let flatList = [];

        categories.forEach(category => {

            flatList.push({
                id: category._id,
                name: category.name,
                type: category?.type,
                parentId: category?.parentId,
            });

            if (category.children && category.children.length > 0) {
                flatList = flatList.concat(flattenCategories(category.children));
            }
        });

        return flatList;
    }

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
            const mappedData = flattenCategories(categoriesState.categories);
            setCategoryData(mappedData);
            const options = createCategoryList(categoriesState.categories); // Assuming createCategoryList is defined
            setCategoryOptions(options);
        }
    }, [categoriesState.categories]);


    // -- Assigning columns of the table
    const columns = [
        {
            name: "id",
            label: "S.No",
            options: {
                filter: true,
            },
        },

        {
            name: "name",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "type",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "parentId",
            options: {
                filter: true,
                sort: true,
            }
        },


        {
            name: "actions",
            label: "ACTIONS",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div style={{ display: 'flex', alignItems: "center", gap: "20px" }}>
                            <button
                                style={{ background: '#f2f2f2', cursor: 'pointer', borderRadius: '5px', color: "#111", fontSize: '16px', padding: '5px' }}
                                onClick={() => handleView(tableMeta.rowData)}>
                                <i className="bi bi-eye-fill"></i>
                            </button>
                        </div>
                    );
                },
            },
        },
    ];

    const handleView = () => {
        console.log("view");
    }

    const handleEdit = () => {
        const form = {
            _id: id,
            name: categoryName,
            parentId: parentId,
            type: type,
        };

        dispatch(updateCategory(form)).then(() => {
            setPopupOpen(false);
        });
        setId(null)
        setCategoryName(null);
        setParentId(null);
        setParentName(null);

    };

    const handleDelete = () => {
        const form = {
            _id: id,
            parentId: parentId
        };
        dispatch(deleteCategory(form)).then(() => {
            setDelPopupOpen(false);
        });
    };

    const handleDataReceived = (data) => {
        data.forEach(item => {
            const parent = categoryData.find(parent => parent.id === item.parentId);
            setId(item.id)
            setCategoryName(item.name);
            setParentId(item?.parentId);
            setParentName(parent?.name);
        });

    };



    return (
        <div>
            <TitleBar title='Category' toggle={() => setOpen(true)} />
            <Table
                title=""
                columns={columns}
                data={categoryData}
                popup={() => setPopupOpen(true)}
                onDataReceived={handleDataReceived}
                delPopup={() => setDelPopupOpen(true)}
                onDelete={handleDataReceived}
            />
            {open &&
                <CategoryFromModel
                    toggle={() => setOpen(false)}
                    selectOptions={categoryOptions}
                />
            }
            {popupOpen &&
                <Popup
                    toggle={() => setPopupOpen(false)}
                    title="Edit Category"
                    selectOptions={categoryOptions}
                    name={categoryName}
                    parentId={parentId}
                    parentName={parentName}
                    type={type}
                    setCategoryName={setCategoryName}
                    setParentId={setParentId}
                    setParentName={setParentName}
                    setType={setType}
                    handleConfirm={handleEdit}
                />
            }
            {delPopupOpen &&
                <ConfirmPopup
                    toggle={() => setDelPopupOpen(false)}
                    title="Are you sure you want to delete?"
                    handleConfirm={handleDelete}
                />}
        </div>
    )
}

export default Category