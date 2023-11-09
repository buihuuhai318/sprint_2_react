import Header from "../layout/Header";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import * as CustomerService from "../../service/customer/CustomerService";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import {Card} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Footer from "../layout/Footer";
import * as React from "react";
import {useEffect, useState} from "react";
import format from "date-fns/format";
import OtherProject from "../layout/OtherProject";
import {BsPencilSquare} from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {toast} from "react-toastify";
import * as AuthService from "../../service/user/AuthService";
import {RingLoader} from "react-spinners";


function Information() {

    const [history, setHistory] = useState(null);
    const [limit, setLimit] = useState(5);
    const [totalElement, setTotalElement] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [edit, setEdit] = useState(false);
    const [buttonMore, setButtonMore] = useState(true);
    const [key, setKey] = useState(true);
    const [loading, setLoading] = useState(false);


    const handleInputChange = (event) => {
        const value = event.target.value;
        setCustomer({
            ...customer,
            name: value
        });
    };

    const cancelEdit = async () => {
        setEdit(false);
        const cus = await CustomerService.getInfo();
        setCustomer(cus.data);
    }

    const editName = async () => {
        if (customer.name.length < 6) {
            toast.warning("Tên không được dưới 6 ký tự")
        } else if (customer.name.length > 50) {
            toast.warning("Tên không được quá 50 ký tự")
        } else {
            const res = await CustomerService.edit(customer);
            console.log(res)
            if (res.status === 200) {
                toast("Cập nhập thông tin thành công");
                setEdit(false);
                setKey(!key);
            } else {
                toast.warning("Cập nhập thông tin thất bại");
            }
        }
    }

    const handleChildValueChange = (value) => {
        setKey(value);
    };

    const getCustomers = async (data) => {
        const res = await CustomerService.getHistory(data);
        const cus = await CustomerService.getInfo();
        console.log(cus)
        setHistory(res.data.content);
        setCustomer(cus.data);
        setTotalElement(res.data.totalElements);
    }

    const getMore = () => {
        if (limit + 5 < totalElement) {
            setLimit(limit + 5);
        } else {
            setLimit(limit + 5);
            setButtonMore(false);
        }
    }

    const handleScrollToDiv = () => {
        const targetDiv = document.getElementById('targetDiv');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 100; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    const getDefault = () => {
        setLimit(5);
        setButtonMore(true);
        handleScrollToDiv();
    }

    const getDate = (date) => {
        const dateObject = new Date(date);
        return format(dateObject, "dd/MM/yyyy HH:mm:ss")
    }

    useEffect(() => {
        getCustomers(limit);
    }, [limit])


    return (history &&
        <>
            <Header key={!key}/>
            <div className="spinner-overlay" style={{display: loading ? 'flex' : 'none'}}>
                <div className="ring-loader">
                    <RingLoader color="white"/>
                </div>
            </div>
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
            <div style={{marginTop: "5%"}} id="targetDiv">
                <div className="container">
                    <h3 className="text-center">Thông tin cá nhân</h3>
                    <hr/>
                    <Table style={{width: "50%", margin: "5%"}}>
                        <tbody>
                        <tr>
                            <th className="col-2">Tên đầy đủ:</th>
                            <td className="col-2">
                                <div style={{display: edit ? "none" : "flex"}}>
                                    <span style={{cursor: 'pointer'}} onClick={() => setEdit(true)}>
                                      {customer.name}
                                    </span>
                                    <BsPencilSquare size={22} style={{marginLeft: "5%", marginBottom: "0"}}
                                                    onClick={() => setEdit(true)}/>
                                </div>
                                <div style={{display: !edit ? "none" : "flex"}}>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="..."
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={customer.name}
                                            onChange={handleInputChange}
                                        />
                                        <Button variant="outline-danger" onClick={() => cancelEdit()}>Huỷ</Button>
                                        <Button variant="outline-dark" id="button-addon2" onClick={() => {
                                            editName();
                                        }}>
                                            Lưu
                                        </Button>
                                    </InputGroup>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{customer.appUser.email}</td>
                        </tr>
                        <tr>
                            <th>Tổng lượt quyên góp:</th>
                            <td>{history[0] ? history[0].count : 0}</td>
                        </tr>
                        <tr>
                            <th>Tổng tiền quyên góp</th>
                            <td>
                                {history[0] ? history[0].moneySum.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }) : "0đ"}
                            </td>
                        </tr>
                        <tr>
                            <th>Mật khẩu</th>
                            <td>
                                <Button variant="outline-dark">Yêu cầu đổi mật khẩu</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <Table style={{marginTop: "5%"}}>
                        <thead>
                        <tr>
                            <th className="col-1" style={{textAlign: "center"}}>#</th>
                            <th className="col-7">Chương trình</th>
                            <th className="col-2" style={{textAlign: "right"}}>Số tiền</th>
                            <th className="col-2" style={{textAlign: "center"}}>Thời gian</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.map((cart, index) => (
                            <tr>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>{index + 1}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    {cart.title}
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "right"}}>
                                    {cart.money.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {getDate(cart.date)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div style={{marginTop: "3%"}}>
                        <div className="container">
                            <div className="text-center">
                                {buttonMore ?
                                    <Button variant="outline-dark" onClick={() => getMore()}>Xem tiếp</Button>
                                    :
                                    <Button variant="outline-dark" onClick={() => getDefault()}>Thu gọn</Button>
                                }
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

export default Information;