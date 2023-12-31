import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as appUserService from "../../service/user/AuthService";
import * as HomeService from "../../service/home/HomeService";
import * as CartService from "../../service/cart/CartService";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/AuthService";
import {toast} from "react-toastify";
import {BsSuitHeart} from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import "./header.css"
import './SearchBox.css'; // Tạo một file SearchBox.css để điều chỉnh kiểu dáng



function Header({refresh}) {
    const navigate = useNavigate();
    const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [types, setTypes] = useState([]);
    const [valueSearch, setValueSearch] = useState("");
    const [moneyCart, setMoneyCart] = useState(0);

    const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
    const roleEmployee = appUserService.checkRoleAppUser("ROLE_EMPLOYEE");

    useEffect(() => {
        getAppUserId();
        getUsername();
        getInfoUser();
        getTypes();
        getMoneyCart();
    }, []);

    useEffect(() => {
        getMoneyCart();
    }, [refresh]);

    const getMoneyCart = async () => {
        try {
            const res = await CartService.getMoneyCart();
            setMoneyCart(res.data);
        } catch (e) {

        }
    }

    const getTypes = async () => {
        try {
            const res = await HomeService.listType();
            setTypes(res.data);
        } catch (e) {

        }
    }

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
            <Navbar expand="lg" className=" sticky-top" style={{zIndex: '2000', backgroundColor: "#53b7ae"}}>
                <Container style={{backgroundColor: "#53b7ae"}}>
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
                            <NavDropdown title="Hoàn Cảnh Quyên Góp" id="basic-nav-dropdown" style={{paddingTop: "0", margin: "0"}}>
                                    {types.map((type, index) => (
                                        <NavDropdown.Item as={Link} to={`/list/${type.id}`} key={index}>
                                                {type.name}
                                        </NavDropdown.Item>
                                    ) )}
                            </NavDropdown>
                            <Nav.Link as={Link} to={`/company`}>Đối Tác Đồng Hành</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form className="d-flex" style={{maxWidth: "280px"}}>
                        <InputGroup>
                        <Form.Control
                            type="search"
                            placeholder="..."
                            className=""
                            aria-label="search"
                            value={valueSearch}
                            style={{backgroundColor: "#53b7ae"}}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        <Button as={Link} to={`/list?value=${valueSearch}`} variant="outline-light" style={{width: "35%"}}>Tìm kiếm</Button>
                        </InputGroup>
                        {/*<form className="search">*/}
                        {/*    <input type="text" placeholder="Search" className="searchInput" />*/}
                        {/*    <button type="button" className="searchButton">*/}
                        {/*        asd*/}
                        {/*        <i className="ri-search-2-1ine"></i>*/}
                        {/*    </button>*/}
                        {/*</form>*/}
                    </Form>
                    <Navbar.Collapse className="justify-content-end d-flex">
                        {userName === "" ?
                            <Navbar.Text>
                                <Link className="nav-link" role="button" to="/login"
                                      aria-expanded="false">
                                    Đăng Nhập
                                </Link>
                            </Navbar.Text>
                            :
                            <>
                                <Nav.Link as={Link}  to="/cart" style={{width: "auto", marginLeft: "1%"}} id='basic-nav-dropdown-cart'>
                                        Giỏ tình thương: {moneyCart.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })} <BsSuitHeart style={{marginBottom: "2%"}}/>
                                </Nav.Link>

                                <label htmlFor="basic-nav-dropdown-login"
                                       style={{color: `white`, marginRight: "2%", marginLeft: "4%"}}>Xin chào: </label>
                                <NavDropdown title={name !== "" ? name : userName} id="basic-nav-dropdown-login">
                                    <NavDropdown.Item as={Link} to="/info">Thông Tin Cá Nhân</NavDropdown.Item>
                                    {(roleAdmin || roleEmployee) && (
                                        <NavDropdown.Item as={Link} to="/admin">Quản Lý</NavDropdown.Item>
                                    )}
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