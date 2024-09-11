import { toast } from "react-toastify";
import Instance from "../Instance/axiosInstance";
import { categoryConstant } from "./constant";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });

        try {
            const res = await Instance.get('category/get_category');

            if (res.status === 200) {
                const { categoryList } = res.data;
                dispatch({
                    type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                    payload: { categories: categoryList }
                });
                // toast.success("Categories fetched successfully!");
            } else {
                dispatch({
                    type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                });
                // toast.error("Failed to fetch categories.");
            }
        } catch (error) {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                payload: { error: error.message }
            });
            toast.error("An error occurred while fetching categories.");
        }
    };
};

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.ADD_CATEGORY_REQUEST });

        try {
            const res = await Instance.post('category/create_category', form);

            if (res.status === 200) {
                dispatch({
                    type: categoryConstant.ADD_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
                toast.success("Category added successfully!");
            } else {
                dispatch({
                    type: categoryConstant.ADD_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                });
                toast.error("Failed to add category.");
            }
        } catch (error) {
            dispatch({
                type: categoryConstant.ADD_CATEGORY_FAILURE,
                payload: { error: error.message }
            });
            toast.error("An error occurred while adding category.");
        }
    };
};

export const updateCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });

        try {
            const res = await Instance.post('category/update_category', form);

            if (res.status === 200) {
                dispatch({
                    type: categoryConstant.UPDATE_CATEGORY_SUCCESS
                });
                toast.success("Category updated successfully!");
                return true;
            } else {
                dispatch({
                    type: categoryConstant.UPDATE_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                });
                toast.error("Failed to update category.");
            }
        } catch (error) {
            dispatch({
                type: categoryConstant.UPDATE_CATEGORY_FAILURE,
                payload: { error: error.message }
            });
            toast.error("An error occurred while updating category.");
        }
    };
};

export const deleteCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST });

        try {
            const res = await Instance.post('category/delete_category', form);

            if (res.status === 200) {
                dispatch({
                    type: categoryConstant.DELETE_CATEGORY_SUCCESS,
                });
                toast.success("Category deleted successfully!");
                return true;
            } else {
                dispatch({
                    type: categoryConstant.DELETE_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                });
                toast.error("Failed to delete category.");
            }
        } catch (error) {
            dispatch({
                type: categoryConstant.DELETE_CATEGORY_FAILURE,
                payload: { error: error.message }
            });
            toast.error("An error occurred while deleting category.");
        }
    };
};
