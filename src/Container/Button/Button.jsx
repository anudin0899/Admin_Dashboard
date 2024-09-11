import React from 'react'
import Style from './button.module.css'

const Button = ({ title, onClick, style }) => {
    return (
        <>
            <button className={`${style ? Style.borderbtn : Style.btn}`} onClick={onClick}>{title}</button >
        </>
    )
}

export default Button