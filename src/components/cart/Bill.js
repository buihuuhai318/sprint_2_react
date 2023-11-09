import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import {BsSuitHeart} from "react-icons/bs";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import {Card} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import * as appUserService from "../../service/user/AuthService";
import format from 'date-fns/format';
import OtherProject from "../layout/OtherProject";



function Bill() {

    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [bill, setBill] = useState(null);
    const [key, setKey] = useState(true);


    const handleChildValueChange = (value) => {
        setKey(value);
    };

    const getInfoUser = async () => {
        try {
            const res = await appUserService.getObjByUserName();
            setName(res.data.name);
        } catch (e) {
        }
    }

    const getDate = (date) => {
        const dateObject = new Date(date);
        return format(dateObject, "dd/MM/yyyy HH:mm:ss")
    }

    useEffect(() => {
        document.title = "#Thehome - Hoá đơn"; // Đặt tiêu đề mới tại đây
        getInfoUser();
        setBill(location.state)
        if (!location.state) {
            navigate("/");
        }
    }, []);

    return ( bill &&
        <>
            <Header key={!key}/>
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
                            <td className="col-2">{getDate(bill.paymentDate)}</td>
                        </tr>
                        <tr>
                            <th>Lượt Quyên Góp</th>
                            <td>{bill.totalProject}</td>
                        </tr>
                        <tr>
                            <th>Tổng tiền</th>
                            <td>{bill.totalMoney.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}</td>
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
                        {bill.list.map((cart, index) => (
                            <tr>
                                <td style={{verticalAlign: "middle"}}>{index + 1}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    <Link to={`/detail/${cart.projectId}`}
                                          style={{color: "black", textDecoration: "none"}}>
                                        {cart.title}
                                    </Link>
                                </td>
                                <td style={{verticalAlign: "middle"}}>
                                    <Badge bg="warning" text="dark">
                                        Còn {cart.date} ngày
                                    </Badge>
                                </td>
                                <td style={{verticalAlign: "middle"}}>
                                    {cart.money.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div style={{marginTop: "3%"}}>
                        <div className="container">
                            <div className="text-center">
                                <Link to="/" className="btn btn-outline-dark">Trở lại trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OtherProject onValueChange={handleChildValueChange}/>
            <Footer/>
        </>
    )
}

export default Bill;