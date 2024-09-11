import Instance from "../Instance/axiosInstance";
import { categoryConstant, productConstant } from "./constant"

export const initialData = () => {
    return async dispatch => {
        // dispatch({ type: initialDataConstant.GET_ALL_INITIALDATA_REQUEST });
        const res = await Instance.get('admin/initialdata');
        if (res.status === 200) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCT_SUCCESS,
                payload: { products }
            })
        }
    }
}