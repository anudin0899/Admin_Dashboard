import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import adminRegisterReducer from './adminReg.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer'
import pageReducer from './page.reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    adminRegister: adminRegisterReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
})

export default rootReducer;