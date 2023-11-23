import {Button, Card, InputGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import * as React from "react";
import * as HomeService from "../../service/home/HomeService";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import * as CartService from "../../service/cart/CartService";
import Modal from "react-bootstrap/Modal";
import {BsSuitHeart} from "react-icons/bs";
import Form from "react-bootstrap/Form";
import * as AuthService from "../../service/user/AuthService";


function OtherProject({onValueChange}) {

    const [other, setOther] = useState(null);
    const [show, setShow] = useState(false);
    const [myModal, setMyModal] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [key, setKey] = useState(true);
    const navigate = useNavigate();



    const addCart = async (data) => {
        try {
            if (inputValue < 1000) {
                toast.warning("Số tiền quyên góp vui lòng lớn hơn 1.000đ bạn nhé !")
            } else if (inputValue > 1000000000) {
                toast.warning("Số tiền quyên góp vượt chỉ tiêu rồi bạn nhé !")
            } else {
                const cart = {
                    projectId: data.id,
                    money: inputValue
                }
                const res = await CartService.addToCart(cart);
                if (res.status === 200) {
                    setKey(!key);
                    toast("Đã thêm vào giỏ tình thương !!!")
                    onValueChange(!key);
                } else {

                }
            }
            setInputValue(null);
            handleClose();
        } catch (e) {
            console.log("loi~")
            setInputValue(null);
            handleClose();
        }
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const handleClose = () => {
        setShow(false);
        setMyModal({});
    }
    const donate = async () => {
        const response = await AuthService.infoAppUserByJwtToken();
        if (!response) {
            navigate("/login");
            toast.warning("Bận cần phải đăng nhập trước !!!");
            return false;
        } else {
            return true;
        }
    }

    const handleShow = (object) => {
        if (donate()) {
            setShow(true);
            setMyModal(object);
        }
    }

    const getOther = async () => {
        try {
            const res = await HomeService.getProjectOther(3);
            setOther(res.data.content);
            console.log(res)
        } catch (e) {

        }
    }

    useEffect(() => {
        getOther();
    }, [])


    return (other &&
        <>
            <div style={{marginTop: "5%"}}>
                <div className="container" style={{paddingBottom: "4%"}}>
                    <h4 style={{marginTop: "5%", paddingTop: "7%", fontWeight: "bold"}}>Các chương trình quyên góp
                        khác</h4>
                    <div className="row">
                        {other ? other.map((project, index) => (
                                <div className="col-4" key={index}>
                                    <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                        <Link to={`/detail/${project.id}`}>
                                            <Card.Img variant="top" src={project.projectImage}/>
                                        </Link>
                                        <Card.Body>
                                            <Link to={`/detail/${project.id}`}
                                                  style={{color: "black", textDecoration: "none"}}>
                                                <Card.Title style={{height: "6rem"}}>
                                                    {project.title}
                                                </Card.Title>
                                            </Link>
                                            <Card.Text>
                                                <div className="row">
                                                    <div className="col-8">
                                                        <Link to={`/company/${project.companyId}`}
                                                              style={{textDecoration: "none", color: 'black'}}>
                                                            <Card.Img variant="top"
                                                                      style={{
                                                                          width: "2rem",
                                                                          height: "2rem",
                                                                          borderRadius: "50%"
                                                                      }}
                                                                      id="img1" src={project.companyImage}/>
                                                            <label htmlFor="img1"
                                                                   style={{margin: "5%"}}>{project.company}</label>
                                                        </Link>
                                                    </div>
                                                    <div className="col-4">
                                                        <Badge bg="warning" text="dark"
                                                               style={{marginTop: "13%", marginLeft: "10%", width: "6rem"}}>
                                                            Còn {project.date} ngày
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </Card.Text>
                                            <div style={{marginBottom: "5%"}}>
                                                <p style={{fontWeight: "bold"}}>
                                                    {project.now.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })} <label style={{fontWeight: "initial", color: "gray"}}> /
                                                    {project.targetLimit.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}</label>
                                                </p>
                                                <ProgressBar now={project.now / project.targetLimit * 100}
                                                             label={`${project.now / project.targetLimit * 100}%`}
                                                             variant="success"
                                                             visuallyHidden/>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt
                                                        quyên
                                                        góp</p>
                                                    <p style={{fontWeight: "bold"}}>{project.count}</p>
                                                </div>
                                                <div className="col-3">
                                                    <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt
                                                        được</p>
                                                    <p style={{fontWeight: "bold"}}>{(project.now / project.targetLimit * 100).toFixed(2)}%</p>
                                                </div>
                                                <div className="col-4 justify-content-end">
                                                    {project.status === 0 ?
                                                        <Button className="btn btn-outline-dark"
                                                                onClick={() => handleShow(project)} style={{
                                                            fontSize: "80%",
                                                            marginTop: "5%",
                                                            marginLeft: "18%"
                                                        }}>
                                                            Quyên góp
                                                        </Button>
                                                        :
                                                        <Button className="btn btn-outline-dark" style={{
                                                            fontSize: "80%",
                                                            marginTop: "5%",
                                                            marginLeft: "15%"
                                                        }} disabled>
                                                            Đạt chỉ tiêu
                                                        </Button>
                                                    }
                                                    <Modal show={show} onHide={handleClose}
                                                           aria-labelledby="contained-modal-title-vcenter"
                                                           centered>
                                                        <MyModal action={handleClose} data={myModal}/>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                </div>
                            )) :
                            <h1 style={{textAlign: "center"}}>Vui lòng quay lại sau !!!</h1>}
                    </div>
                </div>
            </div>
        </>
    )

    function MyModal({data, action}) {
        return (data !== {} &&
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm vào giỏ tình thương <BsSuitHeart style={{marginBottom: "2%"}}/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form.Control
                            className="input-custom"
                            placeholder="......"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        <Button variant="outline-dark" id="button-addon2" className="custom"
                                onClick={() => addCart(data)}>
                            Quyên góp
                        </Button>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={action}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </>
        )
    }
}

export default OtherProject;