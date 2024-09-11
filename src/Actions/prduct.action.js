import Instance from "../Instance/axiosInstance";
import { productConstant } from "./constant"

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({ type: productConstant.ADD_PRODUCT_REQUEST });
        try {
            const res = Instance.post('product/create_product', form);
            if (res.status === 200) {
                dispatch({
                    type: productConstant.ADD_PRODUCT_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: productConstant.ADD_PRODUCT_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
}