import { toast } from "react-toastify";
import Instance from "../Instance/axiosInstance";
import { pageConstant } from "./constant"

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstant.CREATE_PAGE_REQUEST });
        try {
            const res = await Instance.post('/page/create_page', form);
            if (res.status == 201) {
                dispatch({
                    type: pageConstant.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
                toast.success("Successfully Created Page!")
            } else {
                dispatch({
                    type: pageConstant.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
                toast.error("Failed to create Page");
            }
        } catch (error) {
            dispatch({
                type: pageConstant.CREATE_PAGE_FAILURE,
                payload: { error: error }
            });
            toast.error("An error occurred while updating page.");
        }
    }
}

export const getAllPage = () => {
    return async dispatch => {
        dispatch({ type: pageConstant.GET_PAGE_REQUEST });
        try {
            const res = await Instance.get('/page/get_allpages');

            if (res.status == 201) {
                dispatch({
                    type: pageConstant.GET_PAGE_SUCCESS,
                    payload: { pages: res.data.pageslist }
                });
            } else {
                dispatch({
                    type: pageConstant.GET_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating page.");
        }

    }
}