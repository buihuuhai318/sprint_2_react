import React, {useEffect, useState} from "react";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import {Link, useNavigate, NavLink} from "react-router-dom";
import * as appUserService from '../../service/user/AuthService';
import * as EmployeeService from '../../service/employee/EmployeeService';
import {toast} from "react-toastify";


function HeaderAdmin({refresh}) {
    const navigate = useNavigate();
    const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userAppName, setUserAppName] = useState(null);

    const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
    const roleEmployee = appUserService.checkRoleAppUser("ROLE_EMPLOYEE");

    const roleName = () => {
        if (roleAdmin) {
            return "Admin";
        } else if (roleEmployee) {
            return "Employee";
        }
    }


    useEffect(() => {
        getAppUserId();
        getUsername();
    }, [refresh]);

    const getUsername = async () => {
        const response = await appUserService.infoAppUserByJwtToken();
        setUsername(response.sub);
    };


    const getAppUserId = async () => {
        const isLoggedIn = appUserService.infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await appUserService.getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
            const nameUser = await EmployeeService.getInfo();
            setUserAppName(nameUser.data.nameEmployee);
        }
    };

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
                            <NavDropdown title="Dự Án" id="nav-dropdown-dark">
                                <Link to="/admin/history" className="dropdown-item">Lịch sử quyên góp</Link>
                                <Link to="/admin/project" className="dropdown-item">Danh sách dự án</Link>
                                <Link to="/admin/business/product/list" className="dropdown-item">Đối tác đồng hành</Link>
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
                                {!userAppName ? userName : userAppName} - {roleName()}
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

