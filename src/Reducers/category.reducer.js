import { categoryConstant } from "../Actions/constant";

const intialState = {
    categories: [],
    loading: false,
    error: null
};



const buildNewCategory = (parentId, categories, category) => {
    let newCategory = [];

    if (parentId === undefined) {
        return [
            ...categories, {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: [],
            }
        ];
    }

    for (let cat of categories) {
        if (cat._id == parentId) {
            newCategory.push(
                {
                    ...cat,
                    children: cat.children ? buildNewCategory(parentId, [...cat.children, {
                        id: category._id,
                        name: category.name,
                        slug: category.slug,
                        type: category.type,
                        parentId: category.parentId,
                        children: category.children
                    }], category) : []
                }
            )
        } else {
            newCategory.push(
                {
                    ...cat,
                    children: cat.children ? buildNewCategory(parentId, cat.children, category) : []
                }
            )
        }

    }
    return newCategory;
}

export default (state = intialState, action) => {
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstant.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                categories: []
            }
            break;
        case categoryConstant.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstant.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategory(category.parentId, state.categories, category);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstant.ADD_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstant.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstant.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstant.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstant.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstant.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstant.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state
}