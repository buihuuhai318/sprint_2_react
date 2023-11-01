import * as React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Table from "react-bootstrap/Table";
import { Card, CloseButton} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import Button from 'react-bootstrap/Button';
import {BsSuitHeart} from "react-icons/bs";


export function Cart() {
    return (
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
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Chương trình</th>
                            <th>Thời Hạn</th>
                            <th>Đạt được</th>
                            <th>Tổng tiền</th>
                            <th>Xoá</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                Vân Hồ, Tỉnh Sơn La
                            </td>
                            <td>
                                <Badge bg="warning" text="dark">
                                    Còn 120 ngày
                                </Badge>
                            </td>
                            <td>
                                55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                170.000.000đ</label>
                            </td>
                            <td>200.000đ</td>
                            <td>
                                <CloseButton />
                                {/*<button className="btn btn-danger" style={{height: "30%", fontSize: "30%"}}>X</button>*/}
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                Vân Hồ, Tỉnh Sơn La
                            </td>
                            <td>
                                <Badge bg="warning" text="dark">
                                    Còn 120 ngày
                                </Badge>
                            </td>
                            <td>
                                55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                170.000.000đ</label>
                            </td>
                            <td>200.000đ</td>
                            <td>
                                <CloseButton />
                                {/*<button className="btn btn-danger" style={{height: "30%", fontSize: "30%"}}>X</button>*/}
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                Vân Hồ, Tỉnh Sơn La
                            </td>
                            <td>
                                <Badge bg="warning" text="dark">
                                    Còn 120 ngày
                                </Badge>
                            </td>
                            <td>
                                55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                170.000.000đ</label>
                            </td>
                            <td>200.000đ</td>
                            <td>
                                <CloseButton />
                                {/*<button className="btn btn-danger" style={{height: "30%", fontSize: "30%"}}>X</button>*/}
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                Vân Hồ, Tỉnh Sơn La
                            </td>
                            <td>
                                <Badge bg="warning" text="dark">
                                    Còn 120 ngày
                                </Badge>
                            </td>
                            <td>
                                55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                170.000.000đ</label>
                            </td>
                            <td>200.000đ</td>
                            <td>
                                <CloseButton />
                                {/*<button className="btn btn-danger" style={{height: "30%", fontSize: "30%"}}>X</button>*/}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

            <div style={{marginTop: "3%", marginBottom: "5%"}}>
                <div className="container">
                    <div className="text-center">
                        <Button variant="outline-dark">Quyên Góp Ngay</Button>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Cart;