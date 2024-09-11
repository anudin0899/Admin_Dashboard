import React, { useState } from "react";
import Style from './Style.module.css'
// import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../Actions/action";
import { useDispatch, useSelector } from 'react-redux';




const SignIn = ({ toggle }) => {

    const dispatch = useDispatch();

    const [data, setData] = useState("")
    const [password, setPassword] = useState("")
    //const [error, setError] = useState("")

    const auth = useSelector(state => state.auth)
   
    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            data, password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Navigate to={'/admin/home'} />
    }

    return (

        <div className={Style.page_wrapper}>
            <div className={Style.container}>
                <div className={Style.overlayContainer}>
                    <div className={Style.overlay}>
                        <div className={Style.overlayPanel}>
                            <h1>Welcome Back!</h1>
                            <p> To keep connected with us please login admin with your personal info  </p>
                            <button className={Style.ghost} onClick={() => toggle(true)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
                <div className={Style.form_container}>
                    <form onSubmit={userLogin}>
                        <h1>SignIn </h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link>Forgot Your Password</Link>
                        <button>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;