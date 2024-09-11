import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const MenuItem = (props) => {

    const { name, to, icon, subMenu, onClick } = props;

    const [expand, setExpand] = useState(false);

    return (
        <li onClick={onClick}>
            <NavLink  to={to} onClick={() => setExpand(!expand)} className='link menu-item'>
                <div className='menu-icon icon'><i className={icon}></i></div>
                <span>{name}</span>
            </NavLink>
            {subMenu && subMenu.length > 0 ? (
                <ul className={`sub-menu ${expand ? 'active' : ''}`}>
                    {subMenu.map((menu, index) => (
                        <li key={index}>
                            <NavLink to={menu.to} className='link sub-menu-item'>{menu.name}</NavLink>
                        </li>
                    ))}
                </ul>
            ) : null}

        </li>
    );
}

export default MenuItem