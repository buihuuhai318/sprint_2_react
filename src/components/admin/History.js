import HeaderAdmin from "../layout/HeaderAdmin";
import Footer from "../layout/Footer";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import * as React from "react";
import {useEffect, useState} from "react";
import format from "date-fns/format";
import * as HomeAdminService from "../../service/home/HomeAdminService";


function History() {

    const [history, setHistory] = useState(null);

    const getDate = (date) => {
        const dateObject = new Date(date);
        return format(dateObject, "dd/MM/yyyy HH:mm:ss");
    }

    const getHistory = async () => {
        const res = await HomeAdminService.getHistory();
        setHistory(res.data.content);
    }

    useEffect(() => {
        getHistory();
        document.title = "#Thehome - Lịch sử quyên góp"; // Đặt tiêu đề mới tại đây
    }, [])

    return (history &&
        <>
            <HeaderAdmin/>
            <div style={{marginTop: "10%"}} className='mb-5'>
                <div className="container">
                    <Table style={{marginTop: "5%"}}>
                        <thead>
                        <tr>
                            <th className="col-1" style={{textAlign: "center"}}>#</th>
                            <th className="col-2" style={{textAlign: "center"}}>Khách hàng</th>
                            <th className="col-1" style={{textAlign: "right"}}>Số tiền</th>
                            <th className="col-2" style={{textAlign: "center"}}>Thời gian</th>
                            <th className="col-5">Chương trình</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.map((cart, index) => (
                            <tr>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>{index + 1}</td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>{cart.name}</td>
                                <td style={{verticalAlign: "middle", textAlign: "right"}}>
                                    {cart.money.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {getDate(cart.date)}
                                </td>
                                <td style={{verticalAlign: "middle"}}>
                                    <Link to={`/detail/${cart.projectId}`}
                                          style={{color: "black", textDecoration: "none"}}>
                                        {cart.title}
                                    </Link>
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
}

export default History;