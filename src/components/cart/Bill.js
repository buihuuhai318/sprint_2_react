import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import {BsSuitHeart} from "react-icons/bs";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import {Card, CloseButton} from "react-bootstrap";
import {Link} from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import * as appUserService from "../../service/user/AuthService";


function Bill() {

    useEffect(() => {
        document.title = "#Thehome - Hoá đơn"; // Đặt tiêu đề mới tại đây
    }, []);

    const [name, setName] = useState("");

    const getInfoUser = async () => {
        try {
            const res = await appUserService.getObjByUserName();
            setName(res.data.name);
        } catch (e) {
        }
    }

    useEffect(() => {
        getInfoUser();
    }, []);

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
                    <h3 className="text-center">Cám ơn {name} <BsSuitHeart/></h3>
                    <hr/>
                    <Table style={{width: "50%", margin: "5%"}}>
                        <tbody>
                        <tr>
                            <th className="col-2">Thời gian</th>
                            <td className="col-2">31/10/2023</td>
                        </tr>
                        <tr>
                            <th>Lượt Quyên Góp</th>
                            <td>4</td>
                        </tr>
                        <tr>
                            <th>Tổng tiền</th>
                            <td>200.000đ</td>
                        </tr>
                        <tr>
                            <th>Trạng thái</th>
                            <td style={{color: "green"}}>Đã quyên góp thành công</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Table style={{margin: "5%", width: "80%"}}>
                        <thead>
                        <tr>
                            <th className="col-1">#</th>
                            <th className="col-6">Chương trình</th>
                            <th className="col-2">Thời Hạn</th>
                            <th className="col-2">Số tiền</th>
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
                            <td>200.000đ</td>
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
                            <td>200.000đ</td>
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
                            <td>200.000đ</td>
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
                            <td>200.000đ</td>
                        </tr>
                        </tbody>
                    </Table>
                    <div style={{marginTop: "3%"}}>
                        <div className="container">
                            <div className="text-center">
                                <Link to="/bill" className="btn btn-outline-dark">Trở lại trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "3%"}}>
                <div className="container" style={{paddingBottom: "4%"}}>
                    <h4 style={{marginTop: "5%", paddingTop: "7%", fontWeight: "bold"}}>Các chương trình quyên góp
                        khác</h4>
                    <hr/>
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
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên
                                                góp</p>
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
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên
                                                góp</p>
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
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên
                                                góp</p>
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
    )
}

export default Bill;