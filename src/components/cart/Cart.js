import * as React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Table from "react-bootstrap/Table";
import {Card, CloseButton} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import Button from 'react-bootstrap/Button';
import {BsSuitHeart} from "react-icons/bs";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as CartService from "../../service/cart/CartService";
import Modal from "react-bootstrap/Modal";
import {toast} from "react-toastify";
import PaypalCheckoutButton from "../paypal/PaypalCheckoutButton";
import OtherProject from "../layout/OtherProject";


export function Cart() {

    const [carts, setCarts] = useState(null);
    const [moneyCart, setMoneyCart] = useState(0);
    const [key, setKey] = useState(true);
    const [show, setShow] = useState(false);
    const [myModal, setMyModal] = useState(null);
    const [bill, setBill] = useState(null);

    const handleChildValueChange = (value) => {
        setKey(value);
    };

    const handleClose = () => {
        setShow(false);
        setMyModal({});
    }
    const handleShow = (object) => {
        setShow(true);
        setMyModal(object);
    }

    const deleteCart = async (data) => {
        const res = await CartService.delCart(data);
        console.log(res)
        if (res.status === 200) {
            toast("Xoá thành công");
            handleClose();
            setKey(!key);
        } else {
            toast.error("Xoá thất bại");
        }
    }

    const getBill = async () => {
        try {
            const res = await CartService.getBill();
            setBill(res.data);
        } catch (e) {

        }
    }


    const getCarts = async () => {
        try {
            const res = await CartService.getCarts();
            setCarts(res.data);
        } catch (e) {

        }
    }

    const getMoneyCart = async () => {
        try {
            const res = await CartService.getMoneyCart();
            setMoneyCart(res.data);
        } catch (e) {

        }
    }

    useEffect(() => {
        document.title = "#Thehome - Giỏ tình thương"; // Đặt tiêu đề mới tại đây
        getCarts();
        getMoneyCart();
        getBill();
    }, [key]);

    return (carts &&
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
                    <h3 className="text-center">Giỏ tình thương <BsSuitHeart/></h3>
                    <hr/>
                    <div className="row">
                        <div className="col-9">
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
                                        <td style={{verticalAlign: "middle"}}>
                                            <CloseButton onClick={() => handleShow(cart)}/>
                                            <Modal show={show} onHide={handleClose}
                                                   aria-labelledby="contained-modal-title-vcenter"
                                                   centered>
                                                <MyModal action={handleClose} data={myModal}/>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-3">
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
                                                    <PaypalCheckoutButton bill={bill} />
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
            <OtherProject onValueChange={handleChildValueChange}/>
            <Footer/>
        </>
    );

    function MyModal({data, action}) {
        return (data !== {} &&
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá :(</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xoá số tiền &nbsp;
                    <span style={{fontWeight: "bold"}}>
                        {data.money && data.money.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </span>
                     &nbsp; ra khỏi giỏ tình thương ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={action}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={() => deleteCart(data.id)}>
                        Xoá :(
                    </Button>
                </Modal.Footer>
            </>
        )
    }
}

export default Cart;