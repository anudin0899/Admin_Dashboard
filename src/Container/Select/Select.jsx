import React from 'react'
import style from './select.module.css'

const Select = ({ title, options, optionTitle, id, value, name, onChange }) => {
    return (
        <div className={style.formInput_wrap}>
            {title && <label>{title}</label>}
            <select
                name={name}
                id={id}
                value={value}
                onChange={onChange}
            >
                <option value="">{optionTitle}</option>
                {
                    options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Select