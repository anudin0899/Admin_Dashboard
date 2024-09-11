import React from 'react'
import style from './model.module.css'
import { generatedPublicUrl } from '../../Utilities/urlConfig';


const DetailModel = ({ toggle, data }) => {

    const handleClose = () => {
        toggle();
    };

    return (
        <div className={style.model_wrap}>
            <div className={`${style.icon} ${style.head}`} onClick={handleClose}>
                <span> <i className="bi bi-x-lg"></i> </span>
            </div>
            <div className={style.form_wrap}>
                <div className={style.title}>
                    <h3>Product Details</h3>
                </div>
                <div className={style.content}>
                    <div>
                        <h2>{data.name}</h2>
                    </div>
                    <div>
                        <p>Description: {data.description}</p>
                    </div>
                    <div>
                        <p>Price: {data.price}</p>
                    </div>
                    <div>
                        <p>Quantity: {data.quantity}</p>
                    </div>
                    <div>
                        <p>Category: {data.category.name}</p>
                    </div>
                    <h4>Product Images:</h4>
                    <div>
                        {data.productImage.map((image, index) => (
                            <img key={index} src={generatedPublicUrl(image.img)} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailModel