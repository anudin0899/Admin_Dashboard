import React, { useEffect, useState } from 'react'
import style from "./index.module.css"
import Input from '../../Container/Input/Input'
import Models from '../../Container/Models/Models'
import TitleBar from '../../Components/TitleBar/TitleBar'
import { useDispatch, useSelector } from "react-redux";
import createCategoryList from '../../Utilities/flatenCategory';
import Select from '../../Container/Select/Select';
import FromModel from '../../Container/Form/FormModel';
import Button from '../../Container/Button/Button'
import { createPage, getAllPage } from '../../Actions/page.action'

const NewPage = () => {

    const dispatch = useDispatch();
    const category = useSelector(state => state.category?.categories);
    const pageList = useSelector(state => state.page);

    useEffect(() => {
        dispatch(getAllPage())
    }, [])

    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(createCategoryList(category))
    }, [category]);


    const onCategoryChange = (e) => {
        const cate = categories.find(category => category.value == e.target.value);

        setcategoryId(e.target.value);
        if (cate.type == null || cate.type == "undefined") {
            setType("page")
        } else {
            setType(cate?.type)
        }
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProducts([...products, ...files]);
    }

    const handleDeleteImage = (index) => {
        const updatedImages = products.filter((_, i) => i !== index);
        setProducts(updatedImages);
    };

    const handleBannerChange = (e) => {
        const files = Array.from(e.target.files);
        setBanners([...banners, ...files]);
    }

    const handleDeleteBanner = (index) => {
        const updatedImages = banners.filter((_, i) => i !== index);
        setBanners(updatedImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append("banners", banner);
        });
        products.forEach((product, index) => {
            form.append("products", product);
        });

        dispatch(createPage(form)).then(() => {
            setToggle(false);
            setTitle('');
            setcategoryId('');
            setDesc('');
            setType('');
            setProducts([]);
            setBanners([]);
        })

    }

    const handleClose = () => {
        setToggle(false);
        setTitle('');
        setcategoryId('');
        setDesc('');
        setType('');
        setProducts([]);
        setBanners([]);
    }

    const renderCreatePageModel = () => {
        return (
            <FromModel
                title='Create New Page'
                toggle={handleClose}
            >

                <div className={style.formImage_wrap}>
                    <label>Products</label>
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

                {products.length > 0 &&
                    products.map((pic, index) => (
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

                <div className={style.formImage_wrap}>
                    <label>Banners</label>
                    <label htmlFor="banner-input" className={style.icon}>
                        <i className="bi bi-plus-circle-dotted"></i>
                    </label>
                    <input
                        type="file"
                        id="banner-input"
                        name='bannerImage'
                        onChange={handleBannerChange}
                        multiple
                    />
                </div>

                {banners.length > 0 &&
                    banners.map((pic, index) => (
                        <div key={index} className={style.showImg_wrap}>
                            <img
                                src={pic ? URL.createObjectURL(pic) : null}
                                alt=""
                            />
                            {pic.name}
                            <div className={style.imgClearBtn}>
                                <button onClick={() => handleDeleteBanner(index)}>
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                        </div>
                    ))
                }


                <Input
                    title="New Page Title"
                    name="pagetitle"
                    id="pagetitle"
                    placeholder="Page Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    title="Description"
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                <Select
                    title="Category"
                    options={categories || ''}
                    optionTitle="Select Category"
                    value={type}
                    onChange={onCategoryChange}
                />

                <Button
                    title='Save'
                    onClick={(e) => handleSubmit(e)}
                />

            </FromModel>
        )
    }


    return (
        <div>
            <TitleBar title='New Page' toggle={() => setToggle(true)} />
            {toggle && renderCreatePageModel()}

            <div className={style.grid}>
                {pageList && pageList?.page.map((page, index) => {
                    return (
                        <div className={style.card}>
                            <div >
                                <img src={`${page?.banners[0]?.img}`} alt="banner" className={style.card_image} />
                            </div>
                            <div className={style.category}> {page?.title} </div>
                            <div className={style.heading}> {page?.description}
                                <div className={style.author}> By <span className={style.name}>Abi</span> 4 days ago</div>
                            </div>
                        </div>
                       
                    )
                })}
            </div>
        </div>
    )
}

export default NewPage