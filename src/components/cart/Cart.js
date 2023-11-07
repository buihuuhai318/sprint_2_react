import * as React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Table from "react-bootstrap/Table";
import {Card, CloseButton} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import Button from 'react-bootstrap/Button';
import {BsSuitHeart} from "react-icons/bs";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as CartService from "../../service/cart/CartService";



export function Cart() {

    const [carts, setCarts] = useState(null);
    const [moneyCart, setMoneyCart] = useState(0);


    const getCarts = async () => {
        try {
             const res = await CartService.getCarts();
             setCarts(res.data);
            console.log(res)
        } catch (e) {

        }
    }

    const getMoneyCart = async () => {
        try {
            const res = await CartService.getMoneyCart();
            setMoneyCart(res.data);
            console.log(res);
        } catch (e) {

        }
    }

    useEffect(() => {
        document.title = "#Thehome - Giỏ tình thương"; // Đặt tiêu đề mới tại đây
        getCarts();
        getMoneyCart();
    }, []);

    return (carts &&
        <>
            <Header/>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <ExampleCarouselImage link={"https://i.imgur.com/hGcNOjB.jpg"} text="First slide"/>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <ExampleCarouselImage link={"https://i.imgur.com/opo70w8.jpg"} text="Second slide"/>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <ExampleCarouselImage link={"https://i.imgur.com/sWqodzX.jpg"} text="Third slide"/>
                </Carousel.Item>
            </Carousel>
            <div style={{marginTop: "5%"}}>
                <div className="container">
                    <h3 className="text-center">Giỏ tình thương <BsSuitHeart/></h3>
                    <hr/>
                    <div className="row">
                        <div className="col-8">
                            <Table>
                                <thead>
                                <tr>
                                    <th className="col-1">#</th>
                                    <th className="col-6">Chương trình</th>
                                    <th className="col-2">Thời Hạn</th>
                                    <th className="col-2">Số tiền</th>
                                    <th className="col-1">Xoá</th>
                                </tr>
                                </thead>
                                <tbody>
                                {carts && carts.map((cart, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{cart.title}</td>
                                        <td>
                                            <Badge bg="warning" text="dark">
                                                Còn {cart.date} ngày
                                            </Badge>
                                        </td>
                                        <td>
                                            {cart.money.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </td>
                                        <td>
                                            <CloseButton/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-4">
                            <div className="sticky-top" style={{top: "90px"}}>
                                <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                    <Card.Body>
                                        <Card.Title>
                                            Hoá Đơn
                                        </Card.Title>
                                        <hr/>
                                        <Card.Text>
                                            <Table>
                                                <tbody>
                                                <tr>
                                                    <th className="col-6">Lượt Quyên Góp</th>
                                                    <td className="col-2">{carts.length}</td>
                                                </tr>
                                                <tr>
                                                    <th className="col-2">Tổng tiền</th>
                                                    <td className="col-1">
                                                        {moneyCart.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Text>
                                        <div style={{marginTop: "3%"}}>
                                            <div className="container">
                                                <div className="text-center">
                                                    <Link to="/bill" className="btn btn-outline-dark">Quyên Góp Ngay</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "5%"}}>
                <div className="container" style={{paddingBottom: "4%"}}>
                    <h4 style={{marginTop: "5%", paddingTop: "7%", fontWeight: "bold"}}>Các chương trình quyên góp khác</h4>
                    <div className="row">
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                <Card.Body>
                                    <Card.Title>Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                        Vân Hồ, Tỉnh Sơn La</Card.Title>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Card.Img variant="top"
                                                          style={{width: "2rem", height: "2rem", borderRadius: "50%"}}
                                                          id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                <label htmlFor="img1" style={{margin: "5%"}}>MSD United Way</label>
                                            </div>
                                            <div className="col-4">
                                                <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                    Còn 120 ngày
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                góp</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                <Card.Body>
                                    <Card.Title>Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                        Vân Hồ, Tỉnh Sơn La</Card.Title>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Card.Img variant="top"
                                                          style={{width: "2rem", height: "2rem", borderRadius: "50%"}}
                                                          id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                <label htmlFor="img1" style={{margin: "5%"}}>MSD United Way</label>
                                            </div>
                                            <div className="col-4">
                                                <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                    Còn 120 ngày
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                góp</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                <Card.Body>
                                    <Card.Title>Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                        Vân Hồ, Tỉnh Sơn La</Card.Title>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Card.Img variant="top"
                                                          style={{width: "2rem", height: "2rem", borderRadius: "50%"}}
                                                          id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                <label htmlFor="img1" style={{margin: "5%"}}>MSD United Way</label>
                                            </div>
                                            <div className="col-4">
                                                <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                    Còn 120 ngày
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                góp</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Cart;