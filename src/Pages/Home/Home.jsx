import React, { useState } from 'react'
import Style from "./index.module.css"
import Header from '../../Components/Header/Header'
import SideMenu from '../../Components/Sidebar/SideMenu'


const Home = ({ component: Component }) => {
    const [inactive, setinactive] = useState(false);

    return (
        <div className={Style.page_wrapper}>
            <div className={Style.home}>
                <SideMenu onCollapse={(inactive) => {
                    setinactive(inactive);
                }} />
                <div className={`${Style.homeContainer} ${inactive ? `${Style.Con_inactive}` : ""} `} >
                    <Header />
                    <div style={{ padding: '10px 20px' }}>
                        {Component && <Component />}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home