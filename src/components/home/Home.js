import Header from "../layout/Header";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "./ExampleCarouselImage";
import {Button, Card} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './home.css'
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import React, {useEffect, useState} from 'react';
import Footer from "../layout/Footer";
import * as HomeService from "../../service/home/HomeService";
import {Link} from "react-router-dom";


function Home() {

    const [projects, setProjects] = useState([]);
    const [companies, setCompanies] = useState([]);

    const getProjects = async () => {
        try {
            const res = await HomeService.listProject();
            setProjects(res.data.content);
        } catch (e) {

        }
    }

    const getCompanies = async () => {
        try {
            const res = await HomeService.listCompany();
            setCompanies(res.data.content);
        } catch (e) {

        }
    }

    useEffect(() => {
        document.title = "#Thehome - Trang chủ"; // Đặt tiêu đề mới tại đây
        getProjects();
        getCompanies()
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
            <div style={{marginTop: "5%", zIndex: "99999"}}>
                <div className="container">
                    <Card style={{width: '100%', height: "100%"}}>
                        <div className="row">
                            <div className="col-6">
                                <Card.Body>
                                    <Card.Title style={{margin: "4%", fontSize: "180%"}}>Ví Nhân Ái - Thiện nguyện mỗi
                                        ngày</Card.Title>
                                    <Card.Text style={{
                                        marginTop: "4%",
                                        marginRight: "2%",
                                        marginLeft: "4%",
                                        fontSize: "110%"
                                    }}>
                                        Ví Nhân Ái là tính năng tập hợp tất cả các dự án, tổ chức đang gây quỹ từ thiện
                                        trên MoMo. Nơi bạn có thể thực hiện “sống tốt” bằng cách quyên góp Heo Vàng hoặc
                                        tiền mặt.
                                    </Card.Text>
                                    <Card.Text style={{marginTop: "4%", marginRight: "2%", marginLeft: "4%"}}>
                                        Nhìn lại chặng đường Ví Nhân Ái đã đi qua
                                    </Card.Text>
                                    <Table className="custom-table"
                                           style={{marginTop: "4%", marginRight: "2%", marginLeft: "2%"}}>
                                        <thead>
                                        <tr>
                                            <th className="col-4" style={{fontSize: "200%"}}>1+ Ngàn</th>
                                            <th className="col-4" style={{fontSize: "200%"}}>67+ tỷ</th>
                                            <th className="col-4" style={{fontSize: "200%"}}>151+ triệu</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>dự án đã được gây quỹ thành công</td>
                                            <td>đồng được quyên góp</td>
                                            <td>Lượt quyên góp</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </div>
                            <div className="col-6">
                                <Card.Img variant="top" style={{height: "100%", width: "100%", borderRadius: "1%"}}
                                          src="https://i.imgur.com/2jeoooy.jpg"/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div style={{marginTop: "5%", backgroundColor: "#e8cdc5"}}>
                <div className="container" style={{paddingBottom: "4%"}}>
                    <h1 style={{textAlign: "center", marginTop: "5%", paddingTop: "7%", fontWeight: "bold"}}>Các hoàn
                        cảnh quyên góp</h1>
                    <p style={{textAlign: "center", marginBottom: "5%"}}>Chung tay quyên góp giúp đỡ các hoàn cảnh khó
                        khăn trên khắp cả nước.</p>
                    <div className="row">
                        {projects.map((project, index) => (
                            <div className="col-4" key={index}>
                                <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                    <Link to={`/detail/${project.id}`} className="custom-link">
                                        <Card.Img variant="top" src={project.projectImage}/>
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/detail/${project.id}`}
                                              style={{color: "black", textDecoration: "none"}}
                                              className="custom-link">
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
                                                <Button className="btn btn-outline-dark" style={{fontSize: "80%", marginTop: "5%", marginLeft: "18%"}}>
                                                    Quyên góp
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </div>
                        ))}

                    </div>
                </div>
            </div>



            <div className="container" style={{paddingBottom: "10%"}}>
                <h1 style={{textAlign: "center", marginTop: "5%", paddingTop: "7%", fontWeight: "bold"}}>Các đối tác
                    đồng hành</h1>
                <p style={{textAlign: "center", marginBottom: "5%"}}>Các tổ chức nhân đạo Phi Lợi Nhuận đồng hành cùng
                    Ví MoMo giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.</p>
                <div className="row">
                    {companies.map((company, index) => (
                        <div className="col-4">
                            <Card style={{width: '100%', height: "5rem", marginBottom: "5%"}}>
                                <div className="row">
                                    <div className="col-3">
                                        <Image variant="top"
                                               style={{width: "4rem", height: "4rem", margin: "11%"}}
                                               id="img1" src={company.companyImage.name} rounded/>
                                    </div>
                                    <div className="col-9">
                                        <label htmlFor="img1" style={{marginTop: "6%"}}>{company.name}</label>
                                        <p style={{
                                            fontSize: "70%",
                                            color: "gray",
                                            marginRight: "5%"
                                        }}>{company.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{backgroundColor: "#e8cdc5"}}>
                <div className="container" style={{paddingBottom: "5%"}}>
                    <h1 style={{textAlign: "center", marginBottom: "5%", paddingTop: "7%"}}>Ví Nhân Ái - Thiện nguyện
                        mỗi ngày</h1>
                    <div className="row">
                        <div className="col-4">
                            <div style={{marginTop: "10%"}}>
                                <div className="row">
                                    <div className="col-4">
                                        <Image
                                            src="https://homepage.momocdn.net/fileuploads/svg/momo-file-211217034336.svg"
                                            rounded style={{height: "7rem", marginTop: "10%"}}/>
                                    </div>
                                    <div className="col-8">
                                        <h5>Quyên góp nhanh chóng, dễ dàng</h5>
                                        <p style={{color: "gray", fontSize: "90%"}}>Chỉ với vài chạm, bạn đã góp phần
                                            giúp đỡ 1 hoàn cảnh khó khăn có cuộc sống
                                            tốt đẹp hơn.</p>
                                    </div>
                                </div>

                            </div>
                            <div style={{marginTop: "30%"}}>
                                <div style={{marginTop: "30%"}}>
                                    <div className="row">
                                        <div className="col-4">
                                            <Image
                                                src="https://homepage.momocdn.net/fileuploads/svg/momo-file-211217034312.svg"
                                                rounded style={{height: "7rem", marginTop: "10%"}}/>
                                        </div>
                                        <div className="col-8">
                                            <h5>1000đ cũng là đáng quý</h5>
                                            <p style={{color: "gray", fontSize: "90%"}}>Với mức ủng hộ tối thiểu 1.000
                                                đồng, bạn đã cùng hàng triệu nhà hảo tâm
                                                khác của “Trái tim MoMo” giúp đỡ những mảnh đời khó khăn.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <Card.Img variant="top" src="https://i.imgur.com/mhCsxoE.jpg" style={{borderRadius: "5%"}}/>
                        </div>
                        <div className="col-4">
                            <div style={{marginTop: "10%"}}>
                                <div className="row">
                                    <div className="col-8">
                                        <h5>Minh bạch, công khai mọi khoản đóng góp</h5>
                                        <p style={{color: "gray", fontSize: "90%"}}>Mọi thông tin về hoạt động đóng góp,
                                            tài trợ đều được công khai và cập nhật
                                            liên
                                            tục.</p>
                                    </div>
                                    <div className="col-4">
                                        <Image
                                            src="https://homepage.momocdn.net/fileuploads/svg/momo-file-211217034305.svg"
                                            rounded style={{height: "7rem", marginTop: "10%"}}/>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: "30%"}}>
                                <div className="row">
                                    <div className="col-8">
                                        <h5>Đối tác của các cơ quan, tổ chức hảo tâm uy tín</h5>
                                        <p style={{color: "gray", fontSize: "90%"}}>“Trái tim MoMo” đã và đang kết nối
                                            được với rất nhiều đơn vị bảo trợ, báo
                                            chí, đơn vị
                                            hảo tâm uy tín trên cả nước.</p>
                                    </div>
                                    <div className="col-4">
                                        <Image
                                            src="https://homepage.momocdn.net/fileuploads/svg/momo-file-211217034206.svg"
                                            rounded style={{height: "7rem", marginTop: "10%"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Home;