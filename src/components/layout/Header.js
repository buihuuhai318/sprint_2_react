import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import React from "react";


function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top" style={{backgroundColor: "white", zIndex: "2000"}}>
                <div className="container-fluid" style={{backgroundColor: "white"}}>
                    <Navbar.Brand as={Link} to="/admin/home" style={{padding: "0"}}>
                        <img
                            src="https://i.imgur.com/jXcDXlY.png"
                            alt="Home"
                            height="40"
                        />
                    </Navbar.Brand>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hoàng Cảnh Quyên Góp
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Đối Tác Đồng Hành</a>
                            </li>
                        </ul>
                        {/*<form className="d-flex" role="search">*/}
                        {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                        {/*        <button className="btn btn-outline-success" type="submit">Search</button>*/}
                        {/*</form>*/}
                    </div>
                    <div className="collapse navbar-collapse" style={{marginLeft: "auto", width: "0"}}>
                        <div style={{marginLeft: "auto", marginRight: "2%"}}>
                            <Link className="nav-link" role="button" to="/login"
                                aria-expanded="false">
                                Đăng Nhập
                            </Link>
                        </div>
                        {/*<ul className="navbar-nav" style={{marginLeft: "auto"}}>*/}
                        {/*    <li className="nav-item dropdown">*/}
                        {/*        <a className="nav-link dropdown-toggle" role="button"*/}
                        {/*           data-bs-toggle="dropdown" aria-expanded="false">*/}
                        {/*            asd*/}
                        {/*            /!*{userAppName} - {roleName()}*!/*/}
                        {/*        </a>*/}
                        {/*        <ul className="dropdown-menu dropdown-menu-dark" style={{left: "-60px"}}>*/}
                        {/*            /!*<li><Link to={`/admin/information/${userId}`} className="dropdown-item">Thông Tin Cá*!/*/}
                        {/*            /!*    Nhân</Link></li>*!/*/}
                        {/*            /!*<li>*!/*/}
                        {/*            /!*    <button onClick={() => {*!/*/}
                        {/*            /!*        // handleLogOut();*!/*/}
                        {/*            /!*    }} className="dropdown-item">Đăng Xuất*!/*/}
                        {/*            /!*    </button>*!/*/}
                        {/*            /!*</li>*!/*/}
                        {/*        </ul>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;