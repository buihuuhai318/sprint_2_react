import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import * as React from "react";
import * as HomeService from "../../service/home/HomeService";
import {useEffect, useState} from "react";


function OtherProject() {

    const [other, setOther] = useState(null);

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


    return(other &&
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
        </>
    )
}

export default OtherProject;