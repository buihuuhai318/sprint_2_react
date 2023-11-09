import * as React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {useEffect, useState} from "react";
import {Button, Card, Nav, Modal, InputGroup} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from 'react-bootstrap/Table';
import * as HomeService from "../../service/home/HomeService";
import * as CartService from "../../service/cart/CartService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";


function HomeDetail() {

    const params = useParams();
    const [project, setProject] = useState(null);
    const [image, setImage] = useState(null);
    const [story, setStory] = useState(null);
    const [days, setDays] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState(null);
    const [key, setKey] = useState(true);
    const [last, setLast] = useState(null);
    const [most, setMost] = useState(null);
    const [other, setOther] = useState(null);
    const [other1, setOther1] = useState(null);


    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const getOther = async () => {
        try {
            const res = await HomeService.getProjectOther(3);
            setOther(res.data.content);
            console.log(res)
        } catch (e) {

        }
    }

    const getOther1 = async () => {
        try {
            const res = await HomeService.getProjectOther(1);
            setOther1(res.data.content);
            console.log(res)
        } catch (e) {

        }
    }

    const getProject = async (id) => {
        try {
            const res = await HomeService.getProject(id);
            console.log(res)
            setProject(res.data.list[0].project);
            setImage(res.data.list);
            setDays(res.data.day);
            setStory(res.data.stringList);
            setLast(res.data.last);
            setMost(res.data.most);
        } catch (e) {

        }
    }

    const addCart = async () => {
        try {
            if (inputValue < 1000) {
                toast.warning("Số tiền quyên góp vui lòng lớn hơn 1.000đ bạn nhé !")
            } else if (inputValue > (project.target - project.now)) {
                toast.warning("Số tiền quyên góp vượt chỉ tiêu rồi bạn nhé !")
            } else {
                const cart = {
                    projectId: project.id,
                    money: inputValue
                }
                const res = await CartService.addToCart(cart);
                if (res.status === 200) {
                    setKey(!key);
                    setShowInput(false);
                    toast("Đã thêm vào giỏ tình thương !!!")
                } else {
                    setShowInput(false);
                }
            }
        } catch (e) {
            console.log("loi~")
            setShowInput(false);
        }
    }

    const handleScrollToDiv1 = () => {
        const targetDiv = document.getElementById('targetDiv1');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    const handleScrollToDiv2 = () => {
        const targetDiv = document.getElementById('targetDiv2');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    const handleScrollToDiv3 = () => {
        const targetDiv = document.getElementById('targetDiv3');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    useEffect(() => {
        document.title = "#Thehome - Detail"; // Đặt tiêu đề mới tại đây
        getProject(params.id)
        getOther();
        getOther1();
    }, [params.id]);


    return (project &&
        <>
            <Header key={!key}/>
            <div style={{marginTop: "3%"}} id="targetDiv1">
                <div className="container">
                    <h2>
                        {project.title}
                    </h2>
                    <p>
                        {project.description}
                    </p>
                    <p style={{fontSize: "80%"}}>Hôm Nay</p>
                    <div className="row">
                        <div className="col-8">
                            <Carousel>
                                {image.map((img, index) => (
                                    <Carousel.Item interval={3000}>
                                        <ExampleCarouselImage link={img.name} text="First slide"/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Body>
                                    <Card.Title>
                                        Thông Tin Quyên Góp
                                    </Card.Title>
                                    <Card.Img variant="top"
                                              style={{
                                                  width: "3rem",
                                                  height: "3rem",
                                                  borderRadius: "50%",
                                                  marginBottom: "8%"
                                              }}
                                              id="img1" src={project.company.companyImage.name}/>
                                    <label htmlFor="img1" style={{margin: "5%", marginTop: "13%"}}>
                                        <p style={{fontSize: "90%", margin: "0", color: "gray"}}>
                                            Đồng hành cùng dự án</p>
                                        <p style={{fontSize: "90%", margin: "0"}}>{project.company.name}</p>
                                    </label>
                                    <Card.Text>

                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            {project.now.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                            <label style={{fontWeight: "initial", color: "gray"}}> /
                                                {project.target.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </label>
                                        </p>
                                        <ProgressBar now={project.now / project.target * 100}
                                                     label={`${project.now / project.target * 100}%`}
                                                     variant="success"
                                                     visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên
                                                góp</p>
                                            <p style={{fontWeight: "bold"}}>{project.count}</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>{(project.now / project.target * 100).toFixed(2)}%</p>
                                        </div>
                                        <div className="col-4">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Thời Hạn
                                                Còn</p>
                                            <p style={{fontWeight: "bold"}}>{days} Ngày</p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            className="mx-auto mt-3"
                                            style={{width: "95%"}}
                                            onClick={() => setShowInput(true)}
                                            hidden={showInput}
                                        >
                                            Quyên góp
                                        </Button>
                                        <div className="input-group mt-3" hidden={!showInput}>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Giỏ tình thương"
                                                aria-label="Recipient's username" aria-describedby="button-addon2"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button" id="button-addon2"
                                                onClick={() => {
                                                    addCart();
                                                }}
                                            >
                                                Quyên góp
                                            </button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop: "5%"}}>
                <div className="container">
                    <Nav variant="underline" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link style={{color: "black"}} onClick={handleScrollToDiv1}>Hoàn cảnh</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{color: "black"}} onClick={handleScrollToDiv2}>Câu chuyện</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{color: "black"}} onClick={handleScrollToDiv3}>Nhà hảo tâm</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr/>
                    <div style={{marginTop: "2%"}}>
                        <div className="row">
                            <div className="col-8">
                                <div id="targetDiv2"></div>
                                <h5 style={{marginTop: "2%", marginBottom: "3%"}}>Câu chuyện</h5>
                                {story.map((str, index) => (
                                    <p>{str}</p>
                                ))}
                                <hr/>
                                <h5 id="targetDiv3" style={{marginTop: "3%", marginBottom: "3%"}}>Nhà hảo tâm hàng
                                    đầu</h5>
                                <Card>
                                    <Table style={{
                                        margin: "1%",
                                        width: "95%",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}>
                                        <tbody>
                                        {most.map((cus, index) => (
                                            <tr>
                                                <td className="col-1">{index + 1}</td>
                                                <td>{cus.name}</td>
                                                <td style={{textAlign: "right"}}>
                                                    {cus.money.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card>
                                <hr/>
                                <h5 style={{marginTop: "3%", marginBottom: "3%"}}>Nhà hảo tâm mới nhất</h5>
                                <Card>
                                    <Table style={{
                                        margin: "1%",
                                        width: "95%",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}>
                                        <tbody>
                                        {last.map((cus, index) => (
                                            <tr>
                                                <td className="col-1">{index + 1}</td>
                                                <td>{cus.name}</td>
                                                <td style={{textAlign: "right"}}>
                                                    {cus.money.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                            <div className="col-4">
                                <div className="sticky-top" style={{top: "90px"}}>
                                    <h5>Chương trình đang diễn ra</h5>
                                    {other1 ? other1.map((project, index) => (

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
                                                                <Card.Img variant="top"
                                                                          style={{
                                                                              width: "2rem",
                                                                              height: "2rem",
                                                                              borderRadius: "50%"
                                                                          }}
                                                                          id="img1" src={project.companyImage}/>
                                                                <label htmlFor="img1"
                                                                       style={{margin: "5%"}}>{project.company}</label>
                                                            </div>
                                                            <div className="col-4">
                                                                <Badge bg="warning" text="dark" style={{
                                                                    marginTop: "13%",
                                                                    marginLeft: "10%",
                                                                    width: "6rem"
                                                                }}>
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
                                                            <p style={{
                                                                color: "gray",
                                                                marginBottom: "0",
                                                                fontSize: "80%"
                                                            }}>Lượt
                                                                quyên
                                                                góp</p>
                                                            <p style={{fontWeight: "bold"}}>{project.count}</p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p style={{
                                                                color: "gray",
                                                                marginBottom: "0",
                                                                fontSize: "80%"
                                                            }}>Đạt
                                                                được</p>
                                                            <p style={{fontWeight: "bold"}}>{(project.now / project.targetLimit * 100).toFixed(2)}%</p>
                                                        </div>
                                                        <div className="col-4 justify-content-end">
                                                            <Button className="btn btn-outline-dark" style={{
                                                                fontSize: "80%",
                                                                marginTop: "5%",
                                                                marginLeft: "18%"
                                                            }}>
                                                                Quyên góp
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )) :
                                        <h1 style={{textAlign: "center"}}>Vui lòng quay lại sau !!!</h1>}
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

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
                                                        <Card.Img variant="top"
                                                                  style={{
                                                                      width: "2rem",
                                                                      height: "2rem",
                                                                      borderRadius: "50%"
                                                                  }}
                                                                  id="img1" src={project.companyImage}/>
                                                        <label htmlFor="img1"
                                                               style={{margin: "5%"}}>{project.company}</label>
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
                                                    <Button className="btn btn-outline-dark"
                                                            style={{fontSize: "80%", marginTop: "5%", marginLeft: "18%"}}>
                                                        Quyên góp
                                                    </Button>
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

            <Footer/>
        </>
    );
}


export default HomeDetail;