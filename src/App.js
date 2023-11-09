import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import InformationAdmin from "./components/user/InformationAdmin";
import HomeAdmin from "./components/home/HomeAdmin";
import {axiosClient} from "./service/user/AxiosClient";
import Authentication from "./components/auth/Authentication";
import Error403 from "./components/auth/Error403";
import Error401 from "./components/auth/Error401";
import {EnumAppUserRole} from "./components/auth/EnumAppUserRole";
import React from "react";
import {ToastContainer} from "react-toastify";
import LoginForm from "./components/login/LoginForm";
import Home from "./components/home/Home";
import HomeDetail from "./components/home_detail/HomeDetail";
import Cart from "./components/cart/Cart";
import Bill from "./components/cart/Bill";
import ListProject from "./components/home/ListProject";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import Information from "./components/user/Information";


function App() {
    axiosClient();
    return (
        <>
            <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_CLIENT_ID}}>
                <ToastContainer></ToastContainer>
                <Routes>
                    <Route path="/401" element={<Error401/>}/>
                    <Route path="/403" element={<Error403/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/forgot/:userName/:urlPass" element={<LoginForm/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/detail/:id" element={<HomeDetail/>}/>
                    <Route path="/list" element={<ListProject/>}/>
                    <Route path="/list/:id" element={<ListProject/>}/>

                    <Route
                        element={
                            <Authentication
                                allowedRoles={[
                                    EnumAppUserRole.ROLE_ADMIN, EnumAppUserRole.ROLE_CUSTOMER, EnumAppUserRole.ROLE_EMPLOYEE
                                ]}
                            />
                        }
                    >
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/bill" element={<Bill/>}/>
                        <Route path="/bill/*" element={<Bill/>}/>
                        <Route path="/info" element={<Information/>}/>
                    </Route>

                    <Route
                        element={
                            <Authentication
                                allowedRoles={[
                                    EnumAppUserRole.ROLE_ADMIN, EnumAppUserRole.ROLE_EMPLOYEE
                                ]}
                            />
                        }
                    >
                        <Route path="/admin/information/:id" element={<InformationAdmin/>}/>
                        <Route path="/admin/home" element={<HomeAdmin/>}/>
                        <Route path="/admin/*" element={<HomeAdmin/>}/>
                    </Route>
                </Routes>
            </PayPalScriptProvider>
        </>
    );
}

export default App;



