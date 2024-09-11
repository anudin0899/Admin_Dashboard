import React from 'react'
import Style from './pop.module.css'
import Input from '../../Container/Input/Input'
import Select from '../../Container/Select/Select'
import Button from '../../Container/Button/Button'

const Popup = ({ toggle, title, selectOptions, name, parentId, type, setCategoryName, setParentId, setType, handleConfirm }) => {

    const Options = [
        { value: 'store', name: 'Store' },
        { value: 'product', name: 'Product' },
        { value: 'page', name: 'Page' }
    ];



    return (
        <div className={Style.popup}>
            <div className={Style.content_wrap}>
                <div className={Style.Title}>
                    <h3>{title}</h3>
                </div>

                <div className={Style.content}>
                    <Input
                        title="category Name"
                        name="categoryName"
                        id="categoryName"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <Select
                        title="type"
                        options={Options}
                        optionTitle="Select Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    {parentId &&
                        <Select
                            title='parent Name'
                            options={selectOptions}
                            optionTitle="Select Category"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                        />
                    }
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

export default Popup