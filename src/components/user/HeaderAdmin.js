import React, {useEffect, useState} from "react";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import {Link, useNavigate, NavLink} from "react-router-dom";
import {
    getIdByUserName,
    infoAppUserByJwtToken,
} from "../../service/user/AuthService";
import * as appUserService from '../../service/user/AuthService';
import * as UserService from '../../service/user/UserService';
// import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";


function HeaderAdmin({refresh}) {
    const navigate = useNavigate();
    const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [userAppName, setUserAppName] = useState("");

    // replace 2 with userId
    // const dispatch = useDispatch();

    const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
    const roleEmployee = appUserService.checkRoleAppUser("ROLE_EMPLOYEE");

    const roleName = () => {
        if (roleAdmin) {
            return "Admin";
        } else if (roleEmployee) {
            return "Sale";
        }
    }


    useEffect(() => {
        getAppUserId();
        getUsername();
        // getNameUser()
    }, [refresh]);

    const getUsername = async () => {
        const response = await appUserService.infoAppUserByJwtToken();
        setUsername(response);
    };

    const getAppUserId = async () => {
        const isLoggedIn = infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
            const nameUser = await UserService.findById(id.data);
            setUserAppName(nameUser.data.employeeName)
        }
    };

    // const getNameUser = async () => {
    //     const nameUser = await UserService.findById(userId);
    //     console.log(nameUser);
    //     setUserAppName(nameUser.data.employeeName)
    // }

    const handleLogOut = () => {
        localStorage.removeItem("JWT");
        setJwtToken(undefined);
        setUsername(undefined);
        navigate("/login");
        toast("Đăng xuất thành công");
        window.location.reload();
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <div className="container-fluid">
                <Navbar.Brand as={Link} to="/admin/home" style={{padding: "0"}}>
                    <img
                        src="https://i.imgur.com/3rFWFd6.png"
                        alt="Home"
                        height="40"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDarkDropdown"/>
                <Navbar.Collapse id="navbarNavDarkDropdown">

                    <Nav>
                        <NavDropdown title="Quản Lý" id="nav-dropdown-dark">
                            {(roleAdmin) && (
                                <Link to="/admin/admin/employee" className="dropdown-item">Quản Lý Nhân Viên</Link>
                            )}
                            <Link to={`/admin/information/${userId}`} className="dropdown-item">Thông Tin Cá Nhân</Link>
                        </NavDropdown>
                    </Nav>

                    {(roleAdmin || roleEmployee) && (
                        <Nav>
                            <NavDropdown title="Kinh Doanh" id="nav-dropdown-dark">
                                <Link to="/admin/business/order/saleHistory" className="dropdown-item">Quản Lý Lịch Sử
                                    Bán Hàng</Link>
                                <Link to="/admin/business/salereport" className="dropdown-item">Quản Lý Báo Cáo Doanh
                                    Thu</Link>
                                <Link to="/admin/business/product/list" className="dropdown-item">Xem Thông Tin Hàng
                                    Hoá</Link>
                                <Link to="/admin/business/supplier" className="dropdown-item">Quản Lý Nhà Cung
                                    Cấp</Link>
                                <Link to="/admin/business/customer" className="dropdown-item">Quản Lý Khách Hàng</Link>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
                <div className="collapse navbar-collapse" style={{marginLeft: "auto", width: "0"}}>
                    <ul className="navbar-nav" style={{marginLeft: "auto"}}>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                {userAppName} - {roleName()}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" style={{left: "-60px"}}>
                                <li><Link to={`/admin/information/${userId}`} className="dropdown-item">Thông Tin Cá
                                    Nhân</Link></li>
                                <li>
                                    <button onClick={() => {
                                        handleLogOut();
                                    }} className="dropdown-item">Đăng Xuất
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </Navbar>
    );
}

export default HeaderAdmin;

