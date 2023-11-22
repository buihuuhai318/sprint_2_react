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
import * as AuthService from "../../service/user/AuthService";
import * as CartService from "../../service/cart/CartService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import OtherProject from "../layout/OtherProject";
import format from "date-fns/format";


function HomeDetail() {

    const navigate = useNavigate();
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
    const [other1, setOther1] = useState(null);

    const handleChildValueChange = (value) => {
        setKey(value);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };


    const getOther1 = async () => {
        try {
            const res = await HomeService.getProjectOther(1);
            setOther1(res.data.content);
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
            } else if (inputValue > 1000000000) {
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
            setInputValue(null);
        } catch (e) {
            console.log("loi~")
            setShowInput(false);
            setInputValue(null);
        }
    }

    const donate = async () => {
        const response = await AuthService.infoAppUserByJwtToken();
        if (!response) {
            navigate("/login");
        } else {
            setShowInput(true);
        }
    }

    const handleScrollToDiv1 = () => {
        const targetDiv = document.getElementById('targetDiv1');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 80; // Khoảng cách từ phía trên
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
            const targetOffset = targetDiv.offsetTop - 90; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    useEffect(() => {
        document.title = "#Thehome - Detail"; // Đặt tiêu đề mới tại đây
        getProject(params.id)
        getOther1();
        handleScrollToDiv1();
    }, [params.id]);

    const getDate = (date) => {
        const dateObject = new Date(date);
        return format(dateObject, "dd/MM/yyyy HH:mm:ss")
    }

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
                                    <Link to={`/company/${project.company.id}`}
                                          style={{textDecoration: "none", color: 'black'}}>
                                        <label htmlFor="img1" style={{margin: "5%", marginTop: "13%"}}>
                                            <p style={{fontSize: "90%", margin: "0", color: "gray"}}>
                                                Đồng hành cùng dự án</p>
                                            <p style={{fontSize: "90%", margin: "0"}}>{project.company.name}</p>
                                        </label>
                                    </Link>
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
                                            {project.status === 0 ?
                                                <>
                                                    <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Thời
                                                        Hạn
                                                        Còn</p>
                                                    <p style={{fontWeight: "bold"}}>{days} Ngày</p>
                                                </>
                                                :
                                                <>
                                                    <p style={{color: "#7eb54a", marginBottom: "0", fontSize: "80%"}}>
                                                        Đã đạt mục tiêu
                                                    </p>
                                                </>

                                            }
                                        </div>
                                        {project.status === 0 ?
                                            <Button
                                                variant="primary"
                                                className="mx-auto mt-3"
                                                style={{width: "95%"}}
                                                onClick={() => donate()}
                                                hidden={showInput}
                                            >
                                                Quyên góp
                                            </Button>
                                            :
                                            <Button
                                                variant="primary"
                                                className="mx-auto mt-3"
                                                style={{width: "95%", backgroundColor: "white", borderColor: "gray"}}
                                                onClick={() => donate()}
                                                hidden={showInput}
                                                disabled
                                            >
                                                Đạt chỉ tiêu
                                            </Button>
                                        }
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
                                        {most.length !== 0 ? most.map((cus, index) => (
                                                <tr>
                                                    <td className="col-1">
                                                        {index === 0 ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                 viewBox="0 0 24 24">
                                                                <defs>
                                                                    <linearGradient id="prefix__a" x1="50%" x2="50%"
                                                                                    y1="109.021%" y2="16.275%">
                                                                        <stop offset="0%" stop-color="#FFFF3C"
                                                                              stop-opacity="0"></stop>
                                                                        <stop offset="11%" stop-color="#FFFF3C"
                                                                              stop-opacity=".03"></stop>
                                                                        <stop offset="29%" stop-color="#FFFF3C"
                                                                              stop-opacity=".13"></stop>
                                                                        <stop offset="51%" stop-color="#FFFF3C"
                                                                              stop-opacity=".28"></stop>
                                                                        <stop offset="77%" stop-color="#FFFF3C"
                                                                              stop-opacity=".49"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF3C"
                                                                              stop-opacity=".7"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__b" x1="50%" x2="50%"
                                                                                    y1="-94.628%" y2="141.537%">
                                                                        <stop offset="67%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__c" x1="50.016%" x2="50.016%"
                                                                                    y1="-981.641%" y2="201.184%">
                                                                        <stop offset="67%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__d" x1="50%" x2="50%"
                                                                                    y1="1.758%" y2="109.189%">
                                                                        <stop offset="46%" stop-color="#FFFF3C"
                                                                              stop-opacity="0"></stop>
                                                                        <stop offset="72%" stop-color="#FFFF3C"
                                                                              stop-opacity=".36"></stop>
                                                                        <stop offset="91%" stop-color="#FFFF3C"
                                                                              stop-opacity=".6"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF3C"
                                                                              stop-opacity=".7"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__e" x1="49.98%" x2="49.98%"
                                                                                    y1="1.779%" y2="109.19%">
                                                                        <stop offset="67%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__f" x1="50%" x2="50%"
                                                                                    y1="4.907%" y2="299.577%">
                                                                        <stop offset="67%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__g" x1="454.5%" x2="454.5%"
                                                                                    y1="-61.757%" y2="115.135%">
                                                                        <stop offset="67%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF80"
                                                                              stop-opacity=".8"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__h" x1="50%" x2="50%"
                                                                                    y1="1.777%" y2="109.222%">
                                                                        <stop offset="46%" stop-color="#FFFF3C"
                                                                              stop-opacity="0"></stop>
                                                                        <stop offset="72%" stop-color="#FFFF3C"
                                                                              stop-opacity=".36"></stop>
                                                                        <stop offset="91%" stop-color="#FFFF3C"
                                                                              stop-opacity=".6"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF3C"
                                                                              stop-opacity=".7"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="prefix__i" x1="49.5%" x2="49.5%"
                                                                                    y1="1.778%" y2="109.192%">
                                                                        <stop offset="46%" stop-color="#FFFF3C"
                                                                              stop-opacity="0"></stop>
                                                                        <stop offset="72%" stop-color="#FFFF3C"
                                                                              stop-opacity=".36"></stop>
                                                                        <stop offset="91%" stop-color="#FFFF3C"
                                                                              stop-opacity=".6"></stop>
                                                                        <stop offset="100%" stop-color="#FFFF3C"
                                                                              stop-opacity=".7"></stop>
                                                                    </linearGradient>
                                                                </defs>
                                                                <g fill="none" fill-rule="evenodd">
                                                                    <path fill="#FFF" d="M0 0H24V24H0z"></path>
                                                                    <g fill-rule="nonzero">
                                                                        <path fill="#7F3E0F"
                                                                              d="M1.053 1.829L5.115 0.686 8.146 0 8.633 0.686 8.633 14.4 9.672 13.714 10.16 14.4 10.16 18.057 1.602 18.057 1.102 17.371 1.602 14.4 3.36 14.4 3.36 4.343 1.053 4.343 0.553 3.657z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="#EDBC35"
                                                                              d="M0.553 1.143L4.615 0 8.146 0 8.146 13.714 9.684 13.714 9.684 17.371 1.102 17.371 1.102 13.714 2.857 13.714 2.857 3.657 0.553 3.657z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="#D89A2C"
                                                                              d="M7.982 0h.164v13.726h-.164V0zm1.536 13.714v3.445H1.102v.228h8.582v-3.673h-.166zM2.845 3.444H.553v.23h2.292v-.23z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="url(#prefix__a)"
                                                                              d="M1.495 16.901L1.495 14.199 3.252 14.199 3.252 3.184 0.946 3.184 0.946 1.522 4.659 0.482 7.753 0.482 7.753 14.199 9.289 14.199 9.289 16.901z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="url(#prefix__b)"
                                                                              d="M7.592 0.482H8.591999999999999V14.013H7.592z"
                                                                              opacity=".5"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="url(#prefix__c)"
                                                                              d="M9.131 14.199L9.131 16.715 1.495 16.715 1.495 16.901 9.289 16.901 9.289 14.199z"
                                                                              opacity=".5"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="url(#prefix__d)"
                                                                              d="M0.946 1.522L0.946 3.184 3.252 3.184 3.252 7.895 7.753 6.761 7.753 0.482 4.659 0.482z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="url(#prefix__e)"
                                                                              d="M3.742 6.965l2.629-4.88v4.219l-2.629.66zM1.597.496L.166 2.726h1.706v1.468L4.974.025H3.267l-1.67.471z"
                                                                              opacity=".5"
                                                                              transform="translate(2.667 2.914) translate(1.382 .457)"></path>
                                                                        <g opacity=".5">
                                                                            <path fill="url(#prefix__f)"
                                                                                  d="M0.273 1.275L3.986 0.235 6.858 0.235 6.858 0.025 3.764 0.025 0.051 1.065 0.051 2.727 0.273 2.727z"
                                                                                  transform="translate(2.667 2.914) translate(.895 .457)"></path>
                                                                            <path fill="url(#prefix__g)"
                                                                                  d="M2.58 2.937L2.358 2.937 2.358 7.438 2.58 7.383z"
                                                                                  transform="translate(2.667 2.914) translate(.895 .457)"></path>
                                                                        </g>
                                                                        <path fill="url(#prefix__h)"
                                                                              d="M1.168 1.733L4.881 0.693 7.753 0.693 7.753 0.482 4.659 0.482 0.946 1.522 0.946 3.184 1.168 3.184z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                        <path fill="url(#prefix__i)"
                                                                              d="M3.474 3.394L3.252 3.394 3.252 7.895 3.474 7.84z"
                                                                              transform="translate(2.667 2.914)"></path>
                                                                    </g>
                                                                    <g fill-rule="nonzero">
                                                                        <path fill="#E90D3A"
                                                                              d="M.191 3.56c-.007-.877.277-2.11.965-2.81.738-.75 1.67-.863 2.45-.59.85.3 1.285 1.075 1.359 2.046.9-.745 1.868-1.337 3.03-1.397 1.331-.07 2.414.805 2.596 1.926.205 1.26-.151 2.25-.802 3.06C7.72 8.379 3.604 9.513 2.068 8.4 1.075 7.68.209 5.723.19 3.56z"
                                                                              transform="translate(10.819 12.19)"></path>
                                                                        <path fill="#D10B3A"
                                                                              d="M4.632 2.415l.332-.209C4.89 1.256 4.49.538 3.737.213c.587.525.981 1.304.895 2.202zM10.591 2.736c-.07-.444-.222-.696-.433-.982.207.622.575 1.912-.89 3.605C7.75 7.113 5.376 8.57 3.262 8.803 5.35 8.93 8.227 7.747 9.79 5.796c.649-.81 1.007-1.753.8-3.06z"
                                                                              transform="translate(10.819 12.19)"></path>
                                                                        <path fill="#FFF"
                                                                              d="M2.422 5.196c-.661.239-.824.87-1.115.767-.66-.235-.914-1.636-.93-2.049C.294 1.762 1.565.724 2.034.55c.456-.17.95-.123 1.288.135.316.242.487.623.62 1.02.081.248.072.82.357.927.32.121.909-.409 1.188-.61.534-.384 1.141-.702 1.78-.822 1.03-.192 1.781.23 2.299.97.077.112.148.227.193.357.257.738-.295 1.7-1.004 2.173-.623.416-1.36.777-2.054.678-1.132-.164-2.298-.897-4.279-.182z"
                                                                              opacity=".25"
                                                                              transform="translate(10.819 12.19)"></path>
                                                                        <path fill="#FFF"
                                                                              d="M1.982.83c-.258.116-.487.39-.527.703-.034.259.066.32.135.351.07.033.168.003.244-.053.078-.055.14-.13.206-.2.151-.16.335-.296.534-.36.141-.046.285-.175.218-.312-.074-.155-.327-.347-.81-.13zM6.747 1.67c-.144.066-.295.173-.327.314-.03.128.056.24.167.297.11.057.246.073.372.104.427.104.774.399.927.79.1.255.164.591.46.647.2.037.431-.089.558-.26.126-.173.164-.38.167-.574.01-1.115-1.143-1.87-2.324-1.319z"
                                                                              opacity=".5"
                                                                              transform="translate(10.819 12.19)"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            : index === 1 ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="24" viewBox="0 0 24 24">
                                                                    <defs>
                                                                        <linearGradient id="prefix__a" x1="50%" x2="50%"
                                                                                        y1="109.024%" y2="16.341%">
                                                                            <stop offset="0%" stop-color="#FFF"
                                                                                  stop-opacity="0"></stop>
                                                                            <stop offset="11%" stop-color="#FFF"
                                                                                  stop-opacity=".03"></stop>
                                                                            <stop offset="29%" stop-color="#FFF"
                                                                                  stop-opacity=".13"></stop>
                                                                            <stop offset="51%" stop-color="#FFF"
                                                                                  stop-opacity=".28"></stop>
                                                                            <stop offset="77%" stop-color="#FFF"
                                                                                  stop-opacity=".49"></stop>
                                                                            <stop offset="100%" stop-color="#FFF"
                                                                                  stop-opacity=".7"></stop>
                                                                        </linearGradient>
                                                                        <linearGradient id="prefix__b" x1="50%" x2="50%"
                                                                                        y1="-1207.138%" y2="247.335%">
                                                                            <stop offset="67%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                            <stop offset="100%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                        </linearGradient>
                                                                        <linearGradient id="prefix__c" x1="50%" x2="50%"
                                                                                        y1="-4065.923%" y2="489.537%">
                                                                            <stop offset="67%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                            <stop offset="100%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                        </linearGradient>
                                                                        <linearGradient id="prefix__d" x1="50.021%"
                                                                                        x2="50.021%" y1="1.887%"
                                                                                        y2="109.282%">
                                                                            <stop offset="46%" stop-color="#FFF"
                                                                                  stop-opacity="0"></stop>
                                                                            <stop offset="72%" stop-color="#FFF"
                                                                                  stop-opacity=".36"></stop>
                                                                            <stop offset="91%" stop-color="#FFF"
                                                                                  stop-opacity=".6"></stop>
                                                                            <stop offset="100%" stop-color="#FFF"
                                                                                  stop-opacity=".7"></stop>
                                                                        </linearGradient>
                                                                        <linearGradient id="prefix__e" x1="49.941%"
                                                                                        x2="49.941%" y1="1.918%"
                                                                                        y2="109.312%">
                                                                            <stop offset="67%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                            <stop offset="100%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                        </linearGradient>
                                                                        <linearGradient id="prefix__f" x1="50.011%"
                                                                                        x2="50.011%" y1="1.703%"
                                                                                        y2="109.169%">
                                                                            <stop offset="67%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                            <stop offset="100%" stop-color="#FFF"
                                                                                  stop-opacity=".8"></stop>
                                                                        </linearGradient>
                                                                    </defs>
                                                                    <g fill="none" fill-rule="evenodd">
                                                                        <path fill="#FFF" d="M0 0H24V24H0z"></path>
                                                                        <g fill-rule="nonzero">
                                                                            <path fill="#545454"
                                                                                  d="M.635 14.974c1.01-.983 1.933-1.918 2.77-2.805.839-.887 1.563-1.706 2.172-2.457.52-.627.993-1.292 1.415-1.989.335-.571.504-1.037.505-1.396 0-.58-.112-1.001-.331-1.262-.556-.522-1.422-.522-1.977 0-.22.26-.33.681-.33 1.262v1.118H.974l-.636-.686.636-4.597c.354-.203.724-.38 1.106-.525.463-.177.936-.33 1.415-.458.57-.154 1.15-.27 1.735-.347C5.85.749 6.474.708 7.1.709c1.828 0 3.2.428 4.114 1.284.914.857 1.367 2.113 1.36 3.77.003.897-.186 1.784-.553 2.603-.377.84-.848 1.634-1.404 2.368-.57.753-1.196 1.462-1.872 2.12-.676.664-1.326 1.285-1.947 1.866h2.365v-1.296l3.143-.697.636.697v4.96H.635L0 17.687l.635-2.713z"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="#CFCFCF"
                                                                                  d="M0 14.277c1.007-.983 1.93-1.918 2.77-2.805.84-.887 1.564-1.706 2.172-2.457.52-.628.992-1.292 1.415-1.989.336-.573.505-1.037.505-1.396 0-.58-.11-1.001-.332-1.262-.556-.522-1.421-.522-1.977 0-.22.26-.329.681-.329 1.262v1.117H.338V1.454c.355-.204.725-.38 1.107-.526.463-.177.935-.33 1.414-.457C3.43.316 4.01.2 4.594.123 5.214.041 5.84 0 6.464 0c1.829 0 3.2.428 4.114 1.285.915.856 1.368 2.12 1.36 3.792.003.897-.185 1.785-.553 2.603-.377.84-.847 1.634-1.403 2.368-.57.752-1.195 1.461-1.87 2.121-.678.663-1.328 1.285-1.95 1.865h2.366v-1.3h3.778v4.96H0v-3.417z"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="url(#prefix__a)"
                                                                                  d="M.416 17.214v-2.716c.95-.93 1.829-1.828 2.638-2.672.84-.887 1.58-1.723 2.194-2.484.533-.65 1.02-1.338 1.454-2.057.388-.661.576-1.205.576-1.667 0-.706-.151-1.243-.457-1.6-.34-.343-.804-.537-1.287-.537-.484 0-.947.194-1.287.537-.297.352-.457.89-.457 1.6v.638H.766v-4.5c.266-.14.54-.264.82-.373.45-.176.907-.328 1.372-.457C3.512.776 4.075.664 4.645.59 5.25.51 5.862.47 6.473.47c1.726 0 3.02.396 3.845 1.176.825.78 1.204 1.883 1.204 3.415.006.824-.164 1.64-.498 2.395-.362.806-.814 1.568-1.349 2.272-.557.735-1.168 1.427-1.828 2.07-.67.655-1.321 1.28-1.94 1.86l-.915.854h3.952v-1.296h2.946v3.998H.416z"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="url(#prefix__b)"
                                                                                  d="M5.744 13.486l-.914.852h.34l.727-.685c.62-.579 1.271-1.205 1.94-1.859.661-.643 1.272-1.336 1.83-2.07.533-.704.986-1.467 1.348-2.273.334-.747.507-1.556.507-2.374 0-1.434-.35-2.499-1.06-3.26.605.748.903 1.762.903 3.086.001.821-.17 1.634-.506 2.384-.361.806-.814 1.568-1.348 2.272-.557.735-1.168 1.427-1.829 2.07-.667.652-1.32 1.276-1.938 1.857z"
                                                                                  opacity=".5"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="url(#prefix__c)"
                                                                                  d="M11.733 13.216L11.733 17.04 0.416 17.04 0.416 17.214 11.89 17.214 11.89 13.216z"
                                                                                  opacity=".5"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="#B1B1B1"
                                                                                  d="M10.955 1.703c.654.832.983 1.952.983 3.369.003.897-.185 1.785-.553 2.603-.377.84-.847 1.635-1.403 2.368-.57.753-1.195 1.462-1.87 2.122-.56.546-1.399 1.371-1.918 1.853h-.557c.621-.58 1.57-1.504 2.249-2.167.675-.659 1.3-1.368 1.87-2.12.557-.734 1.029-1.528 1.405-2.369.365-.819.552-1.706.549-2.603 0-1.245-.252-2.264-.755-3.056zM4.224 5.63c0-.58.11-1.001.33-1.262.251-.273.614-.417.984-.39.336-.02.665.096.915.321-.225-.349-.594-.58-1.006-.627-.413-.047-.825.093-1.122.383-.229.26-.33.686-.33 1.264v1.115H.338v.313h3.886V5.63zm7.856 7.104v4.647H0v.313h12.306v-4.96h-.226z"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="url(#prefix__d)"
                                                                                  d="M10.318 1.648C9.493.868 8.198.473 6.473.473c-.611 0-1.222.039-1.828.119-.57.075-1.133.187-1.687.336-.465.13-.923.282-1.372.457-.28.11-.554.234-.82.373V6.27h3.042v-.638c0-.706.15-1.243.457-1.6.34-.344.804-.537 1.287-.537.483 0 .947.193 1.287.537.297.352.457.89.457 1.6 0 .457-.187 1.006-.576 1.666-.128.229-.277.457-.441.686l4.974-1.175c.176-.562.265-1.148.265-1.737.004-1.531-.391-2.647-1.2-3.424z"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                            <path fill="url(#prefix__e)"
                                                                                  d="M.263 5.99H.034V1.48c.267-.14.54-.264.82-.373.45-.175.908-.328 1.372-.457C2.781.5 3.344.388 3.913.313 4.52.233 5.13.193 5.742.194c1.725 0 3.02.396 3.844 1.175.023.023.044.048.064.071C8.823.754 7.593.405 5.977.405 5.366.404 4.755.443 4.15.523 3.58.598 3.017.71 2.464.86c-.465.13-.922.282-1.371.458-.28.109-.554.233-.821.372l-.01 4.302zm5.943 1.24c.386-.66.576-1.205.576-1.667 0-.706-.151-1.243-.457-1.6-.079-.094-.17-.177-.27-.246.012.01.024.023.034.036.297.352.457.89.457 1.6 0 .457-.187 1.006-.576 1.666-.128.229-.276.458-.44.686l.44-.105c.078-.121.158-.25.229-.37h.007z"
                                                                                  opacity=".5"
                                                                                  transform="translate(2.42 2.667) translate(.738 .277)"></path>
                                                                            <path fill="url(#prefix__f)"
                                                                                  d="M8.137.63L5.995 3.544c-.15-.032-.303-.047-.457-.046-.488-.027-.962.17-1.287.537-.297.352-.457.89-.457 1.6v.638H.766v-1.11c.756-1.36 1.636-2.95 2.352-4.26C3.623.774 4.135.675 4.65.607 5.258.526 5.87.486 6.48.486 7.036.482 7.59.53 8.137.632zm3.09 2.465c-.182-.547-.496-1.04-.914-1.438-.104-.1-.214-.19-.331-.274l-3.3 6.507 2.022-.48 2.523-4.315z"
                                                                                  transform="translate(2.42 2.667)"></path>
                                                                        </g>
                                                                        <g fill-rule="nonzero">
                                                                            <path fill="#E90D3A"
                                                                                  d="M.191 3.56c-.007-.877.277-2.11.965-2.81.738-.75 1.67-.863 2.45-.59.85.3 1.285 1.075 1.359 2.046.9-.745 1.868-1.337 3.03-1.397 1.331-.07 2.414.805 2.596 1.926.205 1.26-.151 2.25-.802 3.06C7.72 8.379 3.604 9.513 2.068 8.4 1.075 7.68.209 5.723.19 3.56z"
                                                                                  transform="translate(10.819 12.19)"></path>
                                                                            <path fill="#D10B3A"
                                                                                  d="M4.632 2.415l.332-.209C4.89 1.256 4.49.538 3.737.213c.587.525.981 1.304.895 2.202zM10.591 2.736c-.07-.444-.222-.696-.433-.982.207.622.575 1.912-.89 3.605C7.75 7.113 5.376 8.57 3.262 8.803 5.35 8.93 8.227 7.747 9.79 5.796c.649-.81 1.007-1.753.8-3.06z"
                                                                                  transform="translate(10.819 12.19)"></path>
                                                                            <path fill="#FFF"
                                                                                  d="M2.422 5.196c-.661.239-.824.87-1.115.767-.66-.235-.914-1.636-.93-2.049C.294 1.762 1.565.724 2.034.55c.456-.17.95-.123 1.288.135.316.242.487.623.62 1.02.081.248.072.82.357.927.32.121.909-.409 1.188-.61.534-.384 1.141-.702 1.78-.822 1.03-.192 1.781.23 2.299.97.077.112.148.227.193.357.257.738-.295 1.7-1.004 2.173-.623.416-1.36.777-2.054.678-1.132-.164-2.298-.897-4.279-.182z"
                                                                                  opacity=".25"
                                                                                  transform="translate(10.819 12.19)"></path>
                                                                            <path fill="#FFF"
                                                                                  d="M1.982.83c-.258.116-.487.39-.527.703-.034.259.066.32.135.351.07.033.168.003.244-.053.078-.055.14-.13.206-.2.151-.16.335-.296.534-.36.141-.046.285-.175.218-.312-.074-.155-.327-.347-.81-.13zM6.747 1.67c-.144.066-.295.173-.327.314-.03.128.056.24.167.297.11.057.246.073.372.104.427.104.774.399.927.79.1.255.164.591.46.647.2.037.431-.089.558-.26.126-.173.164-.38.167-.574.01-1.115-1.143-1.87-2.324-1.319z"
                                                                                  opacity=".5"
                                                                                  transform="translate(10.819 12.19)"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                : index === 2 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                         height="24" viewBox="0 0 24 24">
                                                                        <defs>
                                                                            <linearGradient id="prefix__a" x1="49.976%"
                                                                                            x2="49.976%" y1="108.96%"
                                                                                            y2="16.272%">
                                                                                <stop offset="0%" stop-color="#EFBC6D"
                                                                                      stop-opacity="0"></stop>
                                                                                <stop offset="12%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".04"></stop>
                                                                                <stop offset="30%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".14"></stop>
                                                                                <stop offset="54%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".3"></stop>
                                                                                <stop offset="81%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".52"></stop>
                                                                                <stop offset="100%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".7"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__b" x1="49.979%"
                                                                                            x2="49.979%" y1="-2542.922%"
                                                                                            y2="521.143%">
                                                                                <stop offset="67%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                                <stop offset="100%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__c" x1="51.333%"
                                                                                            x2="51.333%" y1="-11536.801%"
                                                                                            y2="1635.631%">
                                                                                <stop offset="67%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                                <stop offset="100%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__d" x1="49.988%"
                                                                                            x2="49.988%" y1="-2604.766%"
                                                                                            y2="405.005%">
                                                                                <stop offset="67%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                                <stop offset="100%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__e" x1="50.008%"
                                                                                            x2="50.008%" y1="1.759%"
                                                                                            y2="108.966%">
                                                                                <stop offset="46%" stop-color="#EFBC6D"
                                                                                      stop-opacity="0"></stop>
                                                                                <stop offset="70%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".33"></stop>
                                                                                <stop offset="90%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".6"></stop>
                                                                                <stop offset="100%" stop-color="#EFBC6D"
                                                                                      stop-opacity=".7"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__f" x1="50%" x2="50%"
                                                                                            y1="1.734%" y2="109.151%">
                                                                                <stop offset="67%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                                <stop offset="100%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__g" x1="50.038%"
                                                                                            x2="50.038%" y1="1.773%"
                                                                                            y2="109.193%">
                                                                                <stop offset="67%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                                <stop offset="100%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient id="prefix__h" x1="49.979%"
                                                                                            x2="49.979%" y1="1.779%"
                                                                                            y2="109.278%">
                                                                                <stop offset="67%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                                <stop offset="100%" stop-color="#EFD4AA"
                                                                                      stop-opacity=".8"></stop>
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <g fill="none" fill-rule="evenodd">
                                                                            <path fill="#FFF" d="M0 0H24V23.774H0z"></path>
                                                                            <g fill-rule="nonzero">
                                                                                <path fill="#6F3547"
                                                                                      d="M4.826 7.77h1.51c.538 0 .924-.132 1.157-.396.248-.31.372-.694.35-1.084 0-.574-.12-.99-.362-1.247-.62-.518-1.544-.518-2.164 0-.238.26-.362.683-.362 1.256v.378H.705L.01 5.983.705 2.14c.257-.148.564-.31.924-.48.416-.189.845-.349 1.285-.478.556-.16 1.123-.28 1.698-.355C5.33.732 6.054.687 6.779.692c1.995 0 3.503.43 4.523 1.291 1.021.86 1.534 2.075 1.538 3.642.009.455-.056.91-.19 1.346-.111.363-.271.711-.476 1.036-.18.282-.393.543-.636.778-.238.228-.45.414-.648.578v.228c.227.148.477.325.734.533.599.483 1.05 1.112 1.305 1.82.165.466.245.955.238 1.446.01.734-.126 1.463-.403 2.147-.262.638-.681 1.206-1.221 1.657-.6.49-1.302.85-2.06 1.059-.948.26-1.932.383-2.919.366-.686.006-1.372-.042-2.05-.145-.545-.084-1.083-.202-1.612-.356-.433-.124-.854-.288-1.254-.489-.328-.164-.646-.346-.953-.544L0 16.39l.695-4.002 3.553-.695.695.695v.623c0 .579.119.997.362 1.257.282.276.678.418 1.08.39.407.029.805-.118 1.084-.401.24-.266.36-.755.362-1.469.034-.437-.09-.872-.35-1.234-.238-.275-.614-.412-1.136-.412H4.826l-.695-.694.695-2.68z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="#DD8062"
                                                                                      d="M4.129 7.075h1.507c.538 0 .924-.132 1.157-.396.248-.31.372-.694.35-1.083 0-.574-.12-.99-.36-1.248-.62-.518-1.546-.518-2.166 0-.24.26-.36.679-.36 1.257v.378H.01V1.448c.254-.15.564-.31.923-.48C1.35.778 1.78.619 2.22.49 2.774.329 3.342.21 3.917.135 4.635.04 5.359-.005 6.083 0c1.996 0 3.504.43 4.524 1.291 1.02.86 1.533 2.075 1.538 3.642.023.84-.203 1.667-.652 2.388-.18.283-.393.544-.636.779-.238.228-.45.414-.647.578v.228c.226.148.476.325.73.532.277.223.523.478.734.758.243.328.436.688.574 1.068.165.465.245.954.238 1.446.01.733-.128 1.462-.405 2.146-.263.637-.681 1.205-1.22 1.658-.6.488-1.302.848-2.059 1.058-.95.26-1.934.383-2.921.367-.686.006-1.37-.043-2.048-.146-.546-.083-1.085-.202-1.614-.355-.432-.126-.852-.29-1.252-.49-.328-.163-.646-.345-.953-.544v-4.7h4.248v.623c0 .578.12.997.36 1.257.283.276.68.418 1.083.389.406.03.804-.117 1.083-.4.24-.268.36-.757.36-1.469.033-.437-.09-.873-.35-1.234-.234-.276-.612-.413-1.136-.412H4.133L4.13 7.075z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="#C35F53"
                                                                                      d="M4.257 5.985H.01v-.31h4v-.38c0-.578.12-.997.359-1.256.62-.518 1.546-.518 2.167 0 .067.074.124.157.169.246-.28-.227-.64-.341-1.005-.321-.403-.03-.8.113-1.083.389-.24.26-.36.678-.36 1.256v.376zm7.712.3c.133-.436.197-.89.19-1.345 0-1.304-.359-2.36-1.064-3.187.569.854.854 1.852.817 2.864.017.838-.215 1.664-.67 2.381-.179.282-.392.544-.635.779-.238.227-.45.416-.647.578v.227l.238.171v-.082c.197-.164.414-.355.647-.578.243-.235.457-.496.636-.778.207-.323.37-.668.488-1.03zm-5.288 4.471c-.037-.07-.08-.136-.131-.198-.233-.274-.612-.412-1.136-.412h-1.28v.312h1.528c.365-.022.726.084 1.014.298h.005zM4.455 13.34c-.143-.32-.208-.666-.193-1.013v-.624h-.238v.312c0 .579.12.997.36 1.257.02.024.042.047.066.068h.005zm7.79-2.08c-.137-.38-.33-.74-.574-1.068-.064-.087-.133-.166-.2-.244.516.719.782 1.574.76 2.445.01.734-.128 1.463-.405 2.147-.263.638-.68 1.206-1.219 1.66-.6.487-1.302.847-2.06 1.056-.948.26-1.932.383-2.918.366-1.242.015-2.478-.154-3.665-.5-.433-.125-.852-.289-1.252-.49-.255-.132-.488-.26-.698-.39v.158c.307.198.625.38.953.544.4.2.82.364 1.252.49.53.153 1.068.271 1.614.354.677.103 1.362.152 2.048.146.987.017 1.972-.107 2.921-.366.757-.21 1.46-.57 2.06-1.059.538-.452.956-1.02 1.219-1.657.277-.684.415-1.413.405-2.147.005-.492-.078-.98-.246-1.445h.005z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__a)"
                                                                                      d="M5.869 17.465c-.662.005-1.324-.042-1.979-.141-.526-.08-1.046-.194-1.557-.342-.406-.114-.8-.267-1.176-.455-.255-.13-.476-.257-.69-.385v-3.958H3.8v.143c0 .706.164 1.24.49 1.594.365.367.881.562 1.41.532.534.03 1.053-.17 1.414-.548.329-.364.476-.952.476-1.799.036-.553-.128-1.1-.464-1.552-.324-.38-.821-.572-1.478-.572h-1.06V7.556h1.05c.67 0 1.172-.187 1.493-.553.33-.4.5-.899.476-1.407 0-.701-.164-1.234-.49-1.594-.793-.71-2.026-.71-2.82 0-.309.333-.476.833-.49 1.49H.474V1.734c.193-.105.412-.228.655-.33.394-.18.803-.333 1.221-.455C2.885.796 3.43.682 3.983.608 4.682.518 5.386.476 6.09.481c1.879 0 3.308.398 4.248 1.183.94.786 1.367 1.844 1.367 3.276.016.744-.189 1.476-.59 2.113-.16.248-.35.477-.565.683-.226.214-.436.4-.624.557l-.174.144v.72l.215.14c.214.141.45.312.7.51.245.202.463.431.65.683.214.29.384.608.504.945.143.41.211.839.203 1.27.008.668-.116 1.332-.367 1.956-.234.568-.607 1.075-1.088 1.477-.555.449-1.205.778-1.905.967-.908.252-1.85.373-2.795.36z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__b)"
                                                                                      d="M9.745 9.12v-.683l.174-.144c.188-.157.398-.343.624-.557.215-.206.405-.435.564-.683.402-.637.607-1.37.59-2.113 0-1.432-.447-2.504-1.366-3.276-.031-.025-.067-.045-.098-.07.827.762 1.231 1.791 1.231 3.146.008.403-.048.805-.166 1.193-.1.32-.243.625-.424.91-.161.247-.35.476-.564.683-.224.214-.434.4-.624.556l-.174.143v.722l.214.139.02.034z"
                                                                                      opacity=".5"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__c)"
                                                                                      d="M3.569 12.184c0 .683.171 1.193.476 1.534.071.08.15.151.238.214l-.014-.014c-.326-.35-.49-.885-.49-1.593v-.144l-.21.003z"
                                                                                      opacity=".5"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__d)"
                                                                                      d="M11.814 11.435c-.12-.337-.29-.655-.504-.945-.187-.252-.406-.481-.65-.683l-.031-.023c.163.153.313.32.447.497.482.645.733 1.422.714 2.215.01.668-.113 1.331-.364 1.955-.236.568-.61 1.075-1.09 1.477-.556.449-1.205.78-1.905.97-.909.247-1.85.364-2.795.349-.663.004-1.326-.042-1.981-.14-.527-.08-1.047-.195-1.557-.343-.407-.116-.8-.268-1.177-.455-.164-.085-.314-.169-.457-.25v.063c.205.127.436.255.69.385.376.188.77.34 1.177.455.51.147 1.03.261 1.557.341.654.1 1.316.147 1.979.142.945.016 1.888-.102 2.797-.351.7-.189 1.35-.519 1.905-.967.48-.403.854-.91 1.088-1.478.251-.624.375-1.287.367-1.955.005-.428-.066-.854-.21-1.26z"
                                                                                      opacity=".5"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__e)"
                                                                                      d="M11.531 6.133c.118-.387.174-.79.167-1.193 0-1.432-.448-2.504-1.367-3.276C9.411.893 7.961.481 6.083.481 5.38.476 4.675.519 3.976.608 3.423.682 2.877.796 2.343.95c-.418.122-.827.275-1.222.455-.238.114-.461.228-.654.33v3.772H3.8c.017-.656.181-1.156.49-1.489.793-.71 2.027-.71 2.82 0 .326.349.49.881.49 1.594.024.508-.145 1.008-.476 1.407-.322.366-.824.553-1.493.553H4.588v1.083L10.96 7.29c.052-.068.102-.14.15-.216.182-.295.323-.61.421-.94z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__f)"
                                                                                      d="M4.54 8.195l-.257.055V7.166h1.05c.67 0 1.172-.186 1.493-.553.331-.399.5-.898.476-1.407 0-.701-.164-1.234-.49-1.593-.01-.012-.022-.022-.033-.032.107.068.205.149.29.241.326.348.49.881.49 1.594.024.508-.145 1.008-.476 1.406-.321.367-.823.554-1.493.554H4.54v.82zM.421 1.555c.193-.105.412-.216.655-.33.395-.181.803-.333 1.222-.456C2.832.616 3.378.502 3.93.428 4.629.338 5.333.296 6.038.3c1.779 0 3.15.362 4.088 1.068-.033-.03-.064-.064-.097-.093C9.089.489 7.659.09 5.78.09 5.076.086 4.372.13 3.674.22 3.12.292 2.575.407 2.04.56c-.418.123-.826.275-1.221.455-.238.114-.462.228-.655.33v3.772h.257V1.555z"
                                                                                      opacity=".5"
                                                                                      transform="translate(2.712 2.604) translate(.302 .392)"></path>
                                                                                <path fill="url(#prefix__g)"
                                                                                      d="M3.874 4.9c.056-.325.201-.63.421-.882.094-.1.202-.189.322-.262L6.73.496c-.212 0-.429-.015-.65-.015-.705-.005-1.409.038-2.107.127-.379.055-.729.119-1.057.194L.464 4.688v.819H3.47l.405-.608z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                                <path fill="url(#prefix__h)"
                                                                                      d="M11.633 4.075c-.102-.847-.499-1.636-1.126-2.242L7.58 5.95c-.039.385-.195.751-.45 1.052-.157.177-.357.314-.584.398l-.685.958L9.43 7.59c.588-.904 1.433-2.267 2.202-3.515z"
                                                                                      transform="translate(2.712 2.604)"></path>
                                                                            </g>
                                                                            <g fill-rule="nonzero">
                                                                                <path fill="#E90D3A"
                                                                                      d="M.191 3.56c-.007-.877.277-2.11.965-2.81.738-.75 1.67-.863 2.45-.59.85.3 1.285 1.075 1.359 2.046.9-.745 1.868-1.337 3.03-1.397 1.331-.07 2.414.805 2.596 1.926.205 1.26-.151 2.25-.802 3.06C7.72 8.379 3.604 9.513 2.068 8.4 1.075 7.68.209 5.723.19 3.56z"
                                                                                      transform="translate(10.819 12.19)"></path>
                                                                                <path fill="#D10B3A"
                                                                                      d="M4.632 2.415l.332-.209C4.89 1.256 4.49.538 3.737.213c.587.525.981 1.304.895 2.202zM10.591 2.736c-.07-.444-.222-.696-.433-.982.207.622.575 1.912-.89 3.605C7.75 7.113 5.376 8.57 3.262 8.803 5.35 8.93 8.227 7.747 9.79 5.796c.649-.81 1.007-1.753.8-3.06z"
                                                                                      transform="translate(10.819 12.19)"></path>
                                                                                <path fill="#FFF"
                                                                                      d="M2.422 5.196c-.661.239-.824.87-1.115.767-.66-.235-.914-1.636-.93-2.049C.294 1.762 1.565.724 2.034.55c.456-.17.95-.123 1.288.135.316.242.487.623.62 1.02.081.248.072.82.357.927.32.121.909-.409 1.188-.61.534-.384 1.141-.702 1.78-.822 1.03-.192 1.781.23 2.299.97.077.112.148.227.193.357.257.738-.295 1.7-1.004 2.173-.623.416-1.36.777-2.054.678-1.132-.164-2.298-.897-4.279-.182z"
                                                                                      opacity=".25"
                                                                                      transform="translate(10.819 12.19)"></path>
                                                                                <path fill="#FFF"
                                                                                      d="M1.982.83c-.258.116-.487.39-.527.703-.034.259.066.32.135.351.07.033.168.003.244-.053.078-.055.14-.13.206-.2.151-.16.335-.296.534-.36.141-.046.285-.175.218-.312-.074-.155-.327-.347-.81-.13zM6.747 1.67c-.144.066-.295.173-.327.314-.03.128.056.24.167.297.11.057.246.073.372.104.427.104.774.399.927.79.1.255.164.591.46.647.2.037.431-.089.558-.26.126-.173.164-.38.167-.574.01-1.115-1.143-1.87-2.324-1.319z"
                                                                                      opacity=".5"
                                                                                      transform="translate(10.819 12.19)"></path>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                    : index + 1
                                                        }
                                                    </td>
                                                    <td>{cus.name}</td>
                                                    <td style={{textAlign: "right"}}>
                                                        {cus.money.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                    </td>
                                                </tr>
                                            )) :
                                            <td colSpan={3} style={{textAlign: "center"}}>Trống</td>}
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
                                        {last.length !== 0 ? last.map((cus, index) => (
                                                <tr>
                                                    <td className="col-1">
                                                        {index + 1}
                                                    </td>
                                                    <td>{cus.name}</td>
                                                    <td>{getDate(cus.date)}</td>
                                                    <td style={{textAlign: "right"}}>
                                                        {cus.money.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                    </td>
                                                </tr>
                                            )) :
                                            <td colSpan={3} style={{textAlign: "center"}}>Trống</td>}
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                            <div className="col-4">
                                <div className="sticky-top" style={{top: "90px"}}>
                                    <h5>Chương trình sắp hết hạn</h5>
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
                                                            {project.status === 0 ?
                                                                <Button className="btn btn-outline-dark"
                                                                        as={Link}
                                                                        to={`/detail/${project.id}`}
                                                                        style={{
                                                                            fontSize: "80%",
                                                                            marginTop: "5%",
                                                                            marginLeft: "18%",
                                                                            backgroundColor: "white"
                                                                        }}
                                                                >
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

            <OtherProject onValueChange={handleChildValueChange}/>
            <Footer/>
        </>
    );
}


export default HomeDetail;