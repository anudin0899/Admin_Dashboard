import React from 'react'
import Style from './models.module.css'
import Button from '../Button/Button'

const Models = ({ children, toggle, handleConfirm,title }) => {
    return (
        <div className={Style.popup}>
            <div className={Style.content_wrap}>
                <div className={Style.Title}>
                    <h3>{title}</h3>
                </div>

                <div className={Style.content}>
                    {children}
                </div>

                <div className={Style.btnBox}>

                    <Button
                        title="Cancel"
                        onClick={() => toggle()}
                    />

                    <Button
                        title="Confirm"
                        style={true}
                        onClick={() => handleConfirm()}
                    />
                </div>
            </div>
        </div>
    )
}

export default Models