import * as ListService from "../../service/home/ListService";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import "./list.css"
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Button, CloseButton, InputGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import {BsSuitHeart} from "react-icons/bs";
import {toast} from "react-toastify";
import * as CartService from "../../service/cart/CartService";
import {debounce} from "lodash";


function List() {

    const location = useLocation();
    const params = useParams();
    const [types, setTypes] = useState(null);
    const [infoType, setInfoType] = useState(null);
    const [idTypes, setIdTypes] = useState(params.id);
    const [limit, setLimit] = useState(6);
    const [projects, setProjects] = useState(null);
    const [show, setShow] = useState(false);
    const [myModal, setMyModal] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [key, setKey] = useState(true);
    const [buttonMore, setButtonMore] = useState(true);
    const [totalElement, setTotalElement] = useState(null);


    const getMore = () => {
        if (limit + 3 < totalElement) {
            setLimit(limit + 3);
        } else {
            setLimit(limit + 3);
            setButtonMore(false);
        }
    }

    const getDefaultToDiv = () => {
        getDefault();
        handleScrollToTop();
    }

    const getDefault = debounce (() => {
        setLimit(6);
        setButtonMore(true);
    }, 500)

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
    const handleShow = (object) => {
        setShow(true);
        setMyModal(object);
    }

    const getTypes = async (id) => {
        try {
            let res = await ListService.getListType(id);
            setIdTypes(id);
            setTypes(res.data);
            setInfoType(res.data[0]);
        } catch (e) {

        }
    }

    const handleScrollToTop = () => {
        const targetDiv = document.getElementById('targetTop');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    const getListBySearch = async (value) => {
        try {
            const res = await ListService.getProjectBySearch(value, limit);
            if (res.data !== "") {
                setProjects(res.data.content);
                setTotalElement(res.data.totalElements);
            } else {
                setProjects(null);
            }
            await getTypes(1);
        } catch (e) {
            setProjects(null);
        }
    }

    const getListByType = async (id) => {
        try {
            const res = await ListService.getProject(id, limit);
            if (res.data !== "") {
                setProjects(res.data.content);
                setTotalElement(res.data.totalElements);
            } else {
                setProjects(null);
            }
            await getTypes(id)
        } catch (e) {
            setProjects(null);
        }
    }

    useEffect(() => {
        document.title = "#Thehome - Danh sách"; // Đặt tiêu đề mới tại đây
        if (params.id === undefined) {
            const value = new URLSearchParams(location.search).get('value');
            if (value !== null) {
                getListBySearch(value);
            } else {
                getListByType(1);
                setIdTypes(1);
            }
        } else {
            getListByType(params.id);
            setIdTypes(params.id)
        }
        handleScrollToTop();
    }, [params.id, location.search]);

    useEffect(() => {
        if (params.id === undefined) {
            const value = new URLSearchParams(location.search).get('value');
            if (value !== null) {
                getListBySearch(value);
            } else {
                getListByType(idTypes);
            }
        } else {
            getListByType(idTypes);
        }
    }, [limit]);

    useEffect(() => {
        getTypes(idTypes);
    }, [idTypes]);


    return (infoType && idTypes && types &&
        <>
            <div id="targetTop"></div>
            <Header key={!key}/>
            <Card style={{position: 'relative', border: "none"}}>
                <Card.Img variant="top"
                          src={infoType.image}/>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <Card.Body>
                        <Carousel.Caption style={{top: "100px"}}>
                            <h1>{infoType.name}</h1>
                            <p>{infoType.description}</p>
                        </Carousel.Caption>
                    </Card.Body>
                </div>
            </Card>
            <div className="container mt-3 mb-5">
                <div className="scrollmenu">
                    {types.map((type, index) => (
                        <a key={index} href={`#${type.code}`}
                           style={{
                               borderBottom: "1px solid",
                               borderBottomColor: "gray",
                               fontWeight: index !== 0 ? "normal" : "bold"
                           }}
                           onClick={() => {
                               getListByType(type.id)
                           }}>
                            {type.name}
                        </a>
                    ))}
                </div>
                <div className="row">
                    {projects ? projects.map((project, index) => (
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
                                                          style={{textDecoration: "none", color: 'black', }} className="company">
                                                    <Card.Img variant="top" className="company"
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
                                                    <Badge bg="warning" text="dark" style={{marginTop: "13%", marginLeft: "10%", width: "6rem"}}>
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
                                                    <Button className="btn btn-outline-dark" onClick={() => handleShow(project)} style={{fontSize: "80%", marginTop: "5%", marginLeft: "18%"}}>
                                                        Quyên góp
                                                    </Button>
                                                    :
                                                    <Button className="btn btn-outline-dark" style={{fontSize: "80%", marginTop: "5%", marginLeft: "15%"}} disabled>
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
                        <h1 style={{textAlign: "center", marginTop: "5%"}}>Vui lòng quay lại sau !!!</h1>}
                    <div className="text-center">
                        {buttonMore && totalElement > 6 ?
                            <Button variant="outline-dark" onClick={() => getMore()}>Xem tiếp</Button>
                            :
                            totalElement > 6 &&
                            <Button variant="outline-dark" onClick={() => getDefaultToDiv()}>Thu gọn</Button>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
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
                        <Button variant="outline-dark" id="button-addon2" className="custom" onClick={() => addCart(data)}>
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

export default List;