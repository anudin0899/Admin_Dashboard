import Instance from "../Instance/axiosInstance";
import { authConstants } from "./constant"

export const login = (user) => {
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await Instance.post('/admin/signin', {
            ...user
        })

        if (res.status === 200) {
            const { token, userInfo } = res.data;
            localStorage.setItem("admintoken", token);
            localStorage.setItem("adminUser", JSON.stringify(userInfo));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, userInfo
                }
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}



export const isAdminLoggedIn = () => {
    return async (dispatch) => {
        const admintoken = localStorage.getItem("admintoken");
        if (admintoken) {
            const adminUser = JSON.parse(localStorage.getItem("adminUser"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    admintoken, adminUser
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: "Failed to login" }
            });
        }
    }
}

export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await Instance.post('/admin/signout');

        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });

        }

    }
}