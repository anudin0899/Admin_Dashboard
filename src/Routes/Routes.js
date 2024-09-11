import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from '../Utilities/PrivateRoute';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminLoggedIn } from '../Actions/auth.action';
import Orders from '../Pages/Orders/Orders';
import Customers from '../Pages/Customers/Customer';
import Products from '../Pages/Products/Products';
import Category from '../Pages/Category/Category';
import { initialData } from '../Actions/initialdata.action';
import NewPage from '../Pages/NewPage/NewPage';

const Dashboard = () => {
  return (
    <h1>Dashboard</h1>
  )
};



const Routing = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isAdminLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(initialData())
    }
  }, [auth.authenticate]);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/admin/home' exact element={<Home component={Dashboard} />} />
          <Route path='/admin/customer' exact element={<Home component={Customers} />} />
          {/* <Route path='/admin/content/course' element={<Home component={Course} />} /> */}
          {/* <Route path='/admin/content/videos' element={<Home component={Videos} />} /> */}
          <Route path='/admin/products' element={<Home component={Products} />} />
          <Route path='/admin/order' element={<Home component={Orders} />} />
          <Route path='/admin/category' element={<Home component={Category} />} />
          <Route path='/admin/page' exact element={<Home component={NewPage} />} />
          <Route path='/' exact element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;


