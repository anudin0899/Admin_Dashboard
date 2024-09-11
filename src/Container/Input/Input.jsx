import React from 'react'
import style from './input.module.css'

const Input = ({ title, type = "text", name, placeholder, value, onChange, error }) => {
    return (
        <div className={style.formInput_wrap}>
            {title && <label>{title}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <p className={style.error}>{error}</p>
        </div>
    )
}

export default Input