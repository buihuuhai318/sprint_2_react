import {useEffect, useState} from "react";
import * as ListService from "../../service/home/ListService";
import {Link, useLocation, useParams} from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import Table from "react-bootstrap/Table";
import Footer from "../layout/Footer";
import * as React from "react";
import {CloseButton} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Project() {

    const location = useLocation();
    const params = useParams();
    const [types, setTypes] = useState(null);
    const [infoType, setInfoType] = useState(null);
    const [idTypes, setIdTypes] = useState(null);
    const [limit, setLimit] = useState(10);
    const [projects, setProjects] = useState(null);
    const [show, setShow] = useState(false);
    const [myModal, setMyModal] = useState(null);


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
            console.log("k co type id")
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
            console.log(res)
            if (res.data !== "") {
                console.log(res)

                setProjects(res.data.content);
            } else {
                setProjects(null);
            }
            await getTypes(1);
        } catch (e) {
            setProjects(null);
        }
    }

    console.log(projects)

    const getListByType = async (id) => {
        try {
            const res = await ListService.getProject(id, limit);
            console.log(res)
            if (res.data !== "") {
                setProjects(res.data.content);
            } else {
                setProjects(null);
            }
            await getTypes(id)
        } catch (e) {
            setProjects(null);
            console.log("k co id")
        }
    }

    useEffect(() => {
        document.title = "#Thehome - Danh sách"; // Đặt tiêu đề mới tại đây
        if (params.id === undefined) {
            const value = new URLSearchParams(location.search).get('value');
            if (value !== null) {
                getListBySearch(value);
            } else {
                console.log(1)
                getListBySearch("");
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

    return(projects &&
        <>
            <HeaderAdmin/>
            <div style={{marginTop: "10%"}} className='mb-5'>
                <div className="container">
                    <Table style={{marginTop: "5%"}}>
                        <thead>
                        <tr>
                            <th className="col-1" style={{textAlign: "center"}}>#</th>
                            <th className="col-4" style={{textAlign: "left"}}>Chương trình</th>
                            <th className="col-2" style={{textAlign: "left"}}>Công ty đồng hành</th>
                            <th className="col-1" style={{textAlign: "center"}}>Tổng lượt</th>
                            <th className="col-1" style={{textAlign: "right"}}>Tổng tiền</th>
                            <th className="col-1" style={{textAlign: "right"}}>Mục tiêu</th>
                            <th className="col-1" style={{textAlign: "center"}}>Còn(ngày)</th>
                            <th className="col-1" style={{textAlign: "center"}}>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map((project, index) => (
                            <tr key={index}>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>{index + 1}</td>
                                <td style={{verticalAlign: "middle", textAlign: "left"}}>{project.title}</td>
                                <td style={{verticalAlign: "middle", textAlign: "left"}}>{project.company}</td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>{project.count}</td>
                                <td style={{verticalAlign: "middle", textAlign: "right"}}>
                                    {project.now.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "right"}}>
                                    {project.targetLimit.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>{project.date}</td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    <CloseButton onClick={() => handleShow(projects)}/>
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
            </div>
            <Footer/>
        </>
    )
    function MyModal({data, action}) {
        return (data !== {} &&
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xoá dự án &nbsp;
                    <span style={{fontWeight: "bold"}}>
                        {data.title}
                    </span>
                   ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={action}>
                        Không
                    </Button>
                    <Button variant="danger" >
                        Xoá
                    </Button>
                </Modal.Footer>
            </>
        )
    }
}

export default Project;