import React, { useState } from 'react'
import Style from './pop.module.css'
import Input from '../../Container/Input/Input'
import Select from '../../Container/Select/Select'
import Button from '../../Container/Button/Button'

const ConfirmPopup = ({ toggle, title, handleConfirm }) => {


    return (
        <div className={Style.popup}>
            <div className={Style.content_wrap}>

                <div className={Style.TitleMsg}>
                    <h3>{title}</h3>
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

export default ConfirmPopup