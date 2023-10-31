import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import Information from "./components/user/Information";
import HomeAdmin from "./components/user/HomeAdmin";
import {axiosClient} from "./service/user/AxiosClient";
import Authentication from "./components/user/Authentication";
import Error403 from "./components/user/Error403";
import Error401 from "./components/user/Error401";
import {EnumAppUserRole} from "./components/user/EnumAppUserRole";
import React from "react";
import {ToastContainer} from "react-toastify";
import LoginForm from "./components/user/LoginForm";
import Home from "./components/home/Home";
import HomeDetail from "./components/home_detail/HomeDetail";



function App() {
  axiosClient();
  return (
      <>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/401" element={<Error401/>}/>
          <Route path="/403" element={<Error403/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/detail" element={<HomeDetail/>}/>



          <Route
              element={
                <Authentication
                    allowedRoles={[
                      EnumAppUserRole.ROLE_ADMIN,
                    ]}
                />
              }
          >
            <Route path="/admin/information/:id" element={<Information/>}/>
            <Route path="/admin/home" element={<HomeAdmin/>}/>
            <Route path="/admin/*" element={<HomeAdmin/>}/>
          </Route>


        </Routes>
      </>
  );
}

export default App;


