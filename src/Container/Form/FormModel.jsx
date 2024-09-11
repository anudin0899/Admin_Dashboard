import React from 'react';
import style from './form.module.css';


const FromModel = ({ toggle, title, children }) => {




    const handleClose = () => {
        toggle();
    };



    return (
        <div className={style.model_wrap}>
            <div className={`${style.icon} ${style.head}`} onClick={handleClose}>
                <span> <i className="bi bi-x-lg"></i> {title} </span>
            </div>
            <div className={style.form_wrap}>
                {children}
            </div>
        </div>
    );
};

export default FromModel;
