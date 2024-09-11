import { productConstant } from "../Actions/constant";

const intialState = {
    products: [],
};


export default (state = intialState, action) => {
    switch (action.type) {
        case productConstant.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
    }
    return state;
}