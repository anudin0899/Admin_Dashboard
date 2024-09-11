import React, { useState } from 'react';
import style from './model.module.css';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../Actions/category.action';
import { toast } from 'react-toastify';
import Select from '../../Container/Select/Select';

const CategoryFromModel = ({ toggle, selectOptions }) => {

    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryType, setCategoryType] = useState(null);
    const [error, setError] = useState({})

    const Options = [
        { value: 'store', name: 'Store' },
        { value: 'product', name: 'Product' },
        { value: 'page', name: 'Page' }
    ];

    const handleClose = () => {
        toggle();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        if (categoryName === "") {
            setError({ ...error, catName: 'category name is required' });
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        form.append('type', categoryType);

        dispatch(addCategory(form))
            .then(() => {
                toast.success('Category added successfully');
                setParentCategoryId('');
                setCategoryImage('');
                setCategoryName('');
                setError('');
            })
            .catch((err) => {
                toast.error('Failed to add category');
                console.error('Error adding category:', err);
            });
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        setCategoryImage(e.target.files[0]);
    }

    return (
        <div className={style.model_wrap}>
            <div className={`${style.icon} ${style.head}`} onClick={handleClose}>
                <span> <i className="bi bi-x-lg"></i> </span>
            </div>
            <div className={style.form_wrap}>
                <form onSubmit={handleSubmit}>

                    <div className={style.formImage_wrap}>
                        <label htmlFor="file-input" className={style.icon}>
                            <i className="bi bi-plus-circle-dotted"> </i>
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            name='categoryImage'
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className={style.formInput_wrap}>
                        <label htmlFor="">Category Id</label>
                        <select
                            name="parentCategoryId"
                            id="parentCategoryId"
                            value={parentCategoryId}
                            onChange={(e) => setParentCategoryId(e.target.value)}
                        >
                            <option value="">select category</option>
                            {
                                selectOptions.map((option, index) => {
                                    return (
                                        <option key={index} value={option.value}>{option.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className={style.formInput_wrap}>
                        <label htmlFor="">Category Name</label>
                        <input type="text"
                            name='categoryName'
                            placeholder='Category Name'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <p className={style.error}>{error.catName}</p>
                    </div>

                    <Select
                        title="type"
                        options={Options}
                        optionTitle="Select Type"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    />


                    <div className={style.formBtn_wrap}>
                        <button type='submit'>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CategoryFromModel;
