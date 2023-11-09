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
import {Button} from "react-bootstrap";


function List() {

    const location = useLocation();
    const params = useParams();
    const [types, setTypes] = useState(null);
    const [infoType, setInfoType] = useState(null);
    const [idTypes, setIdTypes] = useState(null);
    const [limit, setLimit] = useState(10);
    const [projects, setProjects] = useState(null);

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
            } else {
                setProjects(null);
            }
            await getTypes(id)
        } catch (e) {
            setProjects(null);
        }
    }

    useEffect(() => {
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
        getTypes(idTypes);
    }, [idTypes]);

    return (infoType && idTypes && types && projects &&
        <>
            <div id="targetTop"></div>
            <Header/>
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
                    {idTypes ? types.map((type, index) => (
                        <a href={`#${type.code}`}
                           style={{
                               borderBottom: "1px solid",
                               borderBottomColor: "gray",
                               fontWeight: idTypes !== type.id ? "normal" : "bold"
                           }}
                           onClick={() => {
                               getListByType(type.id)
                           }}>
                            {type.name}
                        </a>
                    )) : <></>}
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
                        )) :
                        <h1 style={{textAlign: "center"}}>Vui lòng quay lại sau !!!</h1>}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default List;