import React, { useState } from 'react';
import style from './model.module.css';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Actions/prduct.action';

const ProductFromModel = ({ toggle, selectOptions }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [error, setError] = useState({})


    const handleClose = () => {
        toggle();
    };



    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductImage([...productImage, ...files]);
    }

    const handleDeleteImage = (index) => {
        const updatedImages = productImage.filter((_, i) => i !== index);
        setProductImage(updatedImages);
    };

    const validateForm = () => {
        let newErrors = {};

        if (!name) {
            newErrors.name = "Name is required";
        }
        if (!quantity) {
            newErrors.quantity = "Quantity is required";
        }
        if (!price) {
            newErrors.price = "Price is required";
        }
        if (!description) {
            newErrors.description = "Description is required";
        }
        if (!categoryId) {
            newErrors.categoryId = "Category is required";
        }
        if (productImage.length === 0) {
            newErrors.productImage = "Image is required";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        const isValid = validateForm();
        if (isValid) {
            form.append('name', name);
            form.append('quantity', quantity);
            form.append('price', price);
            form.append('description', description);
            form.append('category', categoryId);

            for (let pic of productImage) {
                form.append('productImage', pic);
            }


            dispatch(addProduct(form));

            setName('');
            setQuantity('');
            setPrice('');
            setDescription('');
            setCategoryId('');
            setProductImage([]);
            setError('');
        } else {
            console.log("Something went wrong");
        }


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
                            <i className="bi bi-plus-circle-dotted"></i>
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            name='productImage'
                            onChange={handleImageChange}
                            multiple
                        />
                    </div>

                    {productImage.length > 0 &&
                        productImage.map((pic, index) => (
                            <div key={index} className={style.showImg_wrap}>
                                <img
                                    src={pic ? URL.createObjectURL(pic) : null}
                                    alt=""
                                />
                                {pic.name}
                                <div className={style.imgClearBtn}>
                                    <button onClick={() => handleDeleteImage(index)}>
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    <div className={style.formInput_wrap}>
                        <label htmlFor="">Category</label>
                        <select
                            name="parentCategoryId"
                            id="parentCategoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
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
                        <label htmlFor="">Product Name</label>
                        <input type="text"
                            name='name'
                            placeholder='Product Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className={style.error}>{error.productName}</p>
                    </div>

                    <div className={style.formInput_wrap}>
                        <label htmlFor="">Product Quantity</label>
                        <input type="number"
                            name='quantity'
                            placeholder='Product Quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <p className={style.error}>{error.productName}</p>
                    </div>

                    <div className={style.formInput_wrap}>
                        <label htmlFor="">Product Price</label>
                        <input type="number"
                            name='price'
                            placeholder='Product Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <p className={style.error}>{error.productName}</p>
                    </div>

                    <div className={style.formInput_wrap}>
                        <label htmlFor="">Product Description</label>
                        <textarea
                            name="description"
                            placeholder='Product Description'
                            cols="30"
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className={style.error}>{error.productName}</p>
                    </div>



                    <div className={style.formBtn_wrap}>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFromModel;
