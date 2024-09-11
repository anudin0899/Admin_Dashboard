import React, { useState } from "react";
import Style from './Style.module.css'
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Actions/adminreg.action";
import { toast } from "react-toastify";
// import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
// import { Link } from "react-router-dom";

const SignUp = ({ toggle }) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const adminRegister = (e) => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user)).then(() => {
            // Signup successful, set toggle to false
            toggle(false);
            toast.success("Admin registration sucessfully")
        }).catch((error) => {
            // Handle signup failure if needed
            console.error("Signup failed:", error);
        });
    }

    if (auth.authenticate) {
        return <Navigate to={'/admin'} />
    }

    if (user?.loading) {
        return <p>Loading...!</p>
    }

    return (

        <div className={Style.page_wrapper}>
            <div className={Style.container}>
                <div className={Style.overlayContainer}>
                    <div className={Style.overlay}>
                        <div className={Style.overlayPanel}>
                            <h1>Welcome Back!</h1>
                            <p> To keep connected with us please login admin with your personal info  </p>
                            <button className={Style.ghost} onClick={() => toggle(false)}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
                <div className={Style.form_container}>
                    <form onSubmit={adminRegister}>
                        <h1>Create Admin Account</h1>
                        <span>Use email for registration</span>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button>SignUp</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SignUp;