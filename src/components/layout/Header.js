import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as appUserService from "../../service/user/AuthService";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
import * as UserService from "../../service/user/UserService";
import {toast} from "react-toastify";
import {BsSuitHeart} from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from "react-bootstrap/Table";


function Header() {
    const navigate = useNavigate();
    const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getAppUserId();
        getUsername();
        getInfoUser();
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("JWT");
        setJwtToken(undefined);
        setUsername(undefined);
        setName(undefined);
        setUserId(undefined);
        navigate("/login");
        toast("Đăng xuất thành công");
        window.location.reload();
    };

    const getInfoUser = async () => {
        try {
            const res = await appUserService.getObjByUserName();
            setName(res.data.name);
        } catch (e) {

        }
    }

    const getUsername = async () => {
        try {
            const response = await appUserService.infoAppUserByJwtToken();
            setUsername(response.sub);
        } catch (e) {

        }
    };

    const getAppUserId = async () => {
        const isLoggedIn = infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
        }
    };


    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary sticky-top" style={{zIndex: '2000'}}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="https://i.imgur.com/jXcDXlY.png"
                            alt="Home"
                            height="40"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            <NavDropdown title="Hoàng Cảnh Quyên Góp" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#home">Đối Tác Đồng Hành</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {userName === "" ?
                            <Navbar.Text>
                                <Link className="nav-link" role="button" to="/login"
                                      aria-expanded="false">
                                    Đăng Nhập
                                </Link>
                            </Navbar.Text>
                            :
                            <>
                                <Nav.Link as={Link}  to="/cart" style={{width: "40%"}} id='basic-nav-dropdown-cart'>
                                        Giỏ tình thương: 200.000 <BsSuitHeart style={{marginBottom: "2%"}}/>
                                </Nav.Link>

                                <label htmlFor="basic-nav-dropdown-login"
                                       style={{color: `gray`, marginRight: "2%", marginLeft: "4%"}}>Xin chào: </label>
                                <NavDropdown title={name !== "" ? name : userName} id="basic-nav-dropdown-login">
                                    <NavDropdown.Item href="#action/3.1">Thông Tin Cá Nhân</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4" onClick={handleLogOut}>
                                        Đăng Xuất
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;