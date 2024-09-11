import React from 'react'
import Style from './Style.module.css'
import { CiDark, CiMail } from "react-icons/ci";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../Actions/auth.action';


const Header = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signout());
  }

  return (
    <div className={Style.Header}>
      <div className={Style.wrapper}>
        <div className={Style.search}>
          <input type="text" placeholder='Search' />
          <BiSearch />
        </div>
        <div className={Style.items}>
          <div className={Style.item}>
            <BiLogOutCircle onClick={handleLogout} className={Style.icon} />
          </div>
          <div className={Style.item}>
            <CiDark className={Style.icon} />
          </div>
          <div className={Style.item} onClick={() => Navigate('/admin/messages')}>
            <CiMail className={Style.icon} />
            <div className={Style.counter} > 0 </div>
          </div>
          <div className={Style.item}>

            <img
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              alt="adminImage"
              className={Style.avatar}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header