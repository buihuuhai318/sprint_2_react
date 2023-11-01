import * as React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {useEffect} from "react";
import {Button, Card, Nav, Tab, Tabs} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../home/ExampleCarouselImage";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from 'react-bootstrap/Table';


function HomeDetail() {

    const handleScrollToDiv1 = () => {
        const targetDiv = document.getElementById('targetDiv1');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({ top: targetOffset, behavior: 'smooth' });
        }
    };

    const handleScrollToDiv2 = () => {
        const targetDiv = document.getElementById('targetDiv2');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({ top: targetOffset, behavior: 'smooth' });
        }
    };

    const handleScrollToDiv3 = () => {
        const targetDiv = document.getElementById('targetDiv3');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 70; // Khoảng cách từ phía trên
            window.scrollTo({ top: targetOffset, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        document.title = "#Thehome - Detail"; // Đặt tiêu đề mới tại đây
    }, []);


    return (
        <>
            <Header/>
            <div style={{marginTop: "3%"}} id="targetDiv1">
                <div className="container">
                    <h2>
                        Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện Vân Hồ, Tỉnh Sơn La
                    </h2>
                    <p>
                        ❤️ Hiện người dân, đặc biệt là trẻ em ở thôn vẫn phải dùng ống nhựa, ống tre dẫn nước từ các mó
                        nước về để sử dụng. Khi mùa khô đến thì việc thiếu nước của cả thôn trở nên nghiêm trọng hơn.
                    </p>
                    <p style={{fontSize: "80%"}}>Hôm Nay</p>
                    <div className="row">
                        <div className="col-8">
                            <Carousel>
                                <Carousel.Item interval={3000}>
                                    <ExampleCarouselImage link={"https://i.imgur.com/aeyESqd.jpg"} text="First slide"/>
                                    <Carousel.Caption>
                                        <h1>Triệu Người Chung Tay Quyên Góp</h1>
                                        <p>Vì một Việt Nam tốt đẹp hơn!</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={3000}>
                                    <ExampleCarouselImage link={"https://i.imgur.com/0luhGEi.jpg"} text="Second slide"/>
                                    <Carousel.Caption>
                                        <h1>Dự Án Cộng Đồng</h1>
                                        <p>Cùng chung tay - Xây trường mới - Dựng tương lai</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={3000}>
                                    <ExampleCarouselImage link={"https://i.imgur.com/nJhSDVJ.jpg"} text="Third slide"/>
                                    <Carousel.Caption>
                                        <h1>#Homenothouse</h1>
                                        <p>Không chỉ là ngôi nhà, hãy là một mái ấm!</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={3000}>
                                    <ExampleCarouselImage link={"https://i.imgur.com/nJhSDVJ.jpg"} text="Third slide"/>
                                    <Carousel.Caption>
                                        <h1>#Homenothouse</h1>
                                        <p>Không chỉ là ngôi nhà, hãy là một mái ấm!</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={3000}>
                                    <ExampleCarouselImage link={"https://i.imgur.com/nJhSDVJ.jpg"} text="Third slide"/>
                                    <Carousel.Caption>
                                        <h1>#Homenothouse</h1>
                                        <p>Không chỉ là ngôi nhà, hãy là một mái ấm!</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
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
                                              id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                    <label htmlFor="img1" style={{margin: "5%", marginTop: "13%"}}>
                                        <p style={{fontSize: "90%", margin: "0"}}>Đồng hành cùng dự án</p>
                                        <p style={{fontSize: "90%", margin: "0"}}>MSD United Way</p>
                                    </label>
                                    <Card.Text>

                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên
                                                góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Thời Hạn
                                                Còn</p>
                                            <p style={{fontWeight: "bold"}}>120 Ngày</p>
                                        </div>
                                        <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                            góp</Button>
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
                                <p>
                                    Khi bắt đầu bước vào mùa khô, đội ngũ khảo sát theo chân các cán bộ xã về thôn
                                    Tân Thành, một trong những thôn đặc biệt khó khăn thuộc xã Chiềng Xuân, huyện
                                    Vân Hồ, tỉnh Sơn La. Thôn Tân Thành có 33 hộ gia đình, 147 nhân khẩu gồm 68 phụ
                                    nữ và 38 trẻ em. Người dân ở đây 100% là người đồng bào dân tộc Mông với công
                                    việc chính là sản xuất nông nghiệp với các loại cây ngắn ngày như: ngô, sắn, lúa
                                    và chăn nuôi nhỏ lẻ.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>
                                <p>
                                    Thôn Tân Thành có công trình nước sinh hoạt tự chảy được nhà nước đầu tư xây
                                    dựng vào năm 2007 theo Chương trình 135, tuy nhiên trải qua hơn 16 năm sử dụng,
                                    hiện đã xuống cấp và hư hỏng nặng nề: bai đầu nguồn đang bị bùn đất lấn chiếm;
                                    05 bể chứa nước bị nứt vỡ, hiện đang bỏ hoang; đường ống dẫn nước bị nứt vỡ ở
                                    nhiều điểm, nhiều đoạn không còn ống,… Điều này khiến cho người dân nơi đây
                                    không được cung cấp đầy đủ nước để phục vụ cho sinh hoạt đời sống hàng ngày.
                                </p>


                                <hr/>
                                <h5 id="targetDiv3" style={{marginTop: "3%", marginBottom: "3%"}}>Nhà hảo tâm hàng đầu</h5>
                                <Card>
                                    <Table style={{
                                        margin: "1%",
                                        width: "95%",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}>
                                        <tbody>
                                        <tr>
                                            <td className="col-1">1</td>
                                            <td>Nhà hảo tâm</td>
                                            <td style={{textAlign: "right"}}>120.000đ</td>
                                        </tr>
                                        <tr>
                                            <td className="col-1">2</td>
                                            <td>Nhà hảo tâm</td>
                                            <td style={{textAlign: "right"}}>100.000đ</td>
                                        </tr>
                                        <tr>
                                            <td className="col-1">3</td>
                                            <td>Nhà hảo tâm</td>
                                            <td style={{textAlign: "right"}}>50.000đ</td>
                                        </tr>
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
                                        <tr>
                                            <td className="col-1">1</td>
                                            <td>Nhà hảo tâm</td>
                                            <td style={{textAlign: "right"}}>120.000đ</td>
                                        </tr>
                                        <tr>
                                            <td className="col-1">2</td>
                                            <td>Nhà hảo tâm</td>
                                            <td style={{textAlign: "right"}}>100.000đ</td>
                                        </tr>
                                        <tr>
                                            <td className="col-1">3</td>
                                            <td>Nhà hảo tâm</td>
                                            <td style={{textAlign: "right"}}>50.000đ</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                            <div className="col-4">
                                <div className="sticky-top" style={{top: "90px"}}>
                                    <h5>Chương trình đang diễn ra</h5>
                                    <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                        <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                        <Card.Body>
                                            <Card.Title>
                                                Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                                Vân Hồ, Tỉnh Sơn La
                                            </Card.Title>
                                            <Card.Text>
                                                <div className="row">
                                                    <div className="col-8">
                                                        <Card.Img variant="top"
                                                                  style={{
                                                                      width: "2rem",
                                                                      height: "2rem",
                                                                      borderRadius: "50%"
                                                                  }}
                                                                  id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                        <label htmlFor="img1" style={{margin: "5%"}}>MSD United
                                                            Way</label>
                                                    </div>
                                                    <div className="col-4">
                                                        <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                            Còn 120 ngày
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </Card.Text>
                                            <div style={{marginBottom: "5%"}}>
                                                <p style={{fontWeight: "bold"}}>
                                                    55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                                    170.000.000đ</label>
                                                </p>
                                                <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt
                                                        quyên
                                                        góp</p>
                                                    <p style={{fontWeight: "bold"}}>17</p>
                                                </div>
                                                <div className="col-3">
                                                    <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt
                                                        được</p>
                                                    <p style={{fontWeight: "bold"}}>8.44%</p>
                                                </div>
                                                <div className="col-4">
                                                    <Button variant="primary"
                                                            style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                        góp</Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div style={{marginTop: "5%"}}>
                <div className="container" style={{paddingBottom: "4%"}}>
                    <h4 style={{marginTop: "5%", paddingTop: "7%", fontWeight: "bold"}}>Các chương trình quyên góp khác</h4>
                    <div className="row">
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                <Card.Body>
                                    <Card.Title>Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                        Vân Hồ, Tỉnh Sơn La</Card.Title>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Card.Img variant="top"
                                                          style={{width: "2rem", height: "2rem", borderRadius: "50%"}}
                                                          id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                <label htmlFor="img1" style={{margin: "5%"}}>MSD United Way</label>
                                            </div>
                                            <div className="col-4">
                                                <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                    Còn 120 ngày
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                góp</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                <Card.Body>
                                    <Card.Title>Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                        Vân Hồ, Tỉnh Sơn La</Card.Title>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Card.Img variant="top"
                                                          style={{width: "2rem", height: "2rem", borderRadius: "50%"}}
                                                          id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                <label htmlFor="img1" style={{margin: "5%"}}>MSD United Way</label>
                                            </div>
                                            <div className="col-4">
                                                <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                    Còn 120 ngày
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                góp</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card style={{width: '100%', marginTop: "5%", marginBottom: "5%"}}>
                                <Card.Img variant="top" src="https://i.imgur.com/2jeoooy.jpg"/>
                                <Card.Body>
                                    <Card.Title>Chung tay đem nước sạch về cho 147 người dân tại thôn Tân Thành, Huyện
                                        Vân Hồ, Tỉnh Sơn La</Card.Title>
                                    <Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Card.Img variant="top"
                                                          style={{width: "2rem", height: "2rem", borderRadius: "50%"}}
                                                          id="img1" src="https://i.imgur.com/2jeoooy.jpg"/>
                                                <label htmlFor="img1" style={{margin: "5%"}}>MSD United Way</label>
                                            </div>
                                            <div className="col-4">
                                                <Badge bg="warning" text="dark" style={{marginTop: "13%"}}>
                                                    Còn 120 ngày
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card.Text>
                                    <div style={{marginBottom: "5%"}}>
                                        <p style={{fontWeight: "bold"}}>
                                            55.000đ <label style={{fontWeight: "initial", color: "gray"}}> /
                                            170.000.000đ</label>
                                        </p>
                                        <ProgressBar now={8.44} label={`${8.44}%`} visuallyHidden/>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Lượt quyên góp</p>
                                            <p style={{fontWeight: "bold"}}>17</p>
                                        </div>
                                        <div className="col-3">
                                            <p style={{color: "gray", marginBottom: "0", fontSize: "80%"}}>Đạt được</p>
                                            <p style={{fontWeight: "bold"}}>8.44%</p>
                                        </div>
                                        <div className="col-4">
                                            <Button variant="primary" style={{fontSize: "80%", marginTop: "5%"}}>Quyên
                                                góp</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default HomeDetail;