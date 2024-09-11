import { pageConstant } from "../Actions/constant"

const initialState = {
    error: null,
    loading: false,
    page: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case pageConstant.GET_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstant.GET_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                page: action.payload.pages
            }
            break;
        case pageConstant.GET_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                page: []
            }
            break;
        case pageConstant.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstant.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                page: action.payload.page
            }
            break;

        case pageConstant.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                page: []
            }
            break;

    }
    return state
}