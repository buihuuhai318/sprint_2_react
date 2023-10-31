import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <>
            {/*<Navbar expand="lg" style={{height: "20rem", backgroundColor: "black"}}>*/}
            {/*    <Container>*/}
            {/*        <Navbar.Brand href="#">*/}
            {/*            <img*/}
            {/*                src="https://i.imgur.com/3rFWFd6.png"*/}
            {/*                alt="Home"*/}
            {/*                height="40"*/}
            {/*            />*/}
            {/*        </Navbar.Brand>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}
            <nav className="navbar navbar-expand-lg sticky-top" style={{backgroundColor: "rgb(23 23 23)"}}>
                <div className="container">
                    <Navbar.Brand as={Link} to="/admin/home" style={{padding: "0"}}>
                        <img
                            src="https://i.imgur.com/3rFWFd6.png"
                            alt="Home"
                            height="40"
                        />
                    </Navbar.Brand>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <label style={{marginLeft: "5%", color: "gray", fontSize: "90%", marginTop: "1.5%", width: "100%"}} htmlFor="">CÔNG TY CỔ PHẦN DỊCH VỤ TRỰC TUYẾN</label>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" style={{marginLeft: "auto", width: "0"}}>
                        <div style={{marginLeft: "auto", marginRight: "2%", paddingTop: "5%"}}>
                            <p style={{color: "gray", textAlign: "right", marginLeft: "auto", marginTop: "1.5%"}}>©Copyright Bui Huu Hai 2023</p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Footer;