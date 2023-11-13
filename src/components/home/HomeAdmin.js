import HeaderAdmin from "../layout/HeaderAdmin";
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {Chart, registerables} from "chart.js";
import * as AdminService from '../../service/home/HomeAdminService';
import * as HomeService from "../../service/home/HomeService";
import Footer from "../layout/Footer";
Chart.register(...registerables);


function HomeAdmin() {



    const [days, setDays] = useState(AdminService.getDaysOfMonth);
    const [chart, setChart] = useState([[],[],[]]);
    const [types, setTypes] = useState([]);

    const getChart = async () => {
        const res = await AdminService.getChart();
        setChart(res.data);
        console.log(res);
    }

    const getTypes = async () => {
        try {
            const res = await HomeService.listType();
            const newArray = res.data.map(item => item.name);
            setTypes(newArray);
            console.log(res)
        } catch (e) {

        }
    }

    function getRandomColor() {
        // Tạo một mảng chứa 3 giá trị ngẫu nhiên từ 0 đến 255 (đại diện cho R, G, B)
        const randomColor = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256));

        // Thêm giá trị alpha (độ trong suốt) là 0.2
        const alpha = 0.2;

        // Trả về chuỗi màu sắc trong định dạng rgba
        return `rgba(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]}, ${alpha})`;
    }


// Tạo mảng màu sắc ngẫu nhiên
    const randomColors = Array.from({ length: chart.length }, () => getRandomColor());

    const barChartData = {
        labels: days,
        datasets: [
            {
                type: "bar",
                label: "Tổng tiền",
                backgroundColor: "rgba(211,11,59,0.2)",
                data: chart[1],
                yAxisID: "y1",
            },
            {
                type: "line",
                label: "Tổng lượt",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
                data: chart[0],
                yAxisID: "y2",
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                scaleLabel: {
                    display: true,
                    labelString: "Ngày",
                },
            },
            y1: {
                beginAtZero: true,
                min: 0,
                position: "left",
                scaleLabel: {
                    display: true,
                    labelString: "Số đơn bán",
                },
            },
            y2: {
                beginAtZero: true,
                min: 0,
                position: "right",
                scaleLabel: {
                    display: true,
                    labelString: "Lợi Nhuận (VND)",
                },
            },
        },
    };


    const donutChartData = {
        labels: types,
        datasets: [
            {
                data: chart[4],
                backgroundColor: randomColors,
                borderColor: randomColors.map(color => color.replace("0.2", "1")), // Đổi alpha thành 1 cho đường viền
                borderWidth: 1,
            },
        ],
    };


    const cardBodyStyle = {
        color: 'white',
        minHeight: '100px',
        fontSize: '35px',
    };

    useEffect(() => {
        document.title = "#Thehome - Quản lý"; // Đặt tiêu đề mới tại đây
        getChart();
        getTypes();
    }, []);

    return (chart[2].length !== 0 &&
        <>
            <HeaderAdmin/>
            <div className="container my-5 pt-4" style={{margin: '10% auto 10% auto', paddingTop: "10%"}}>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: '#02b9a8'}}>
                            <div className="card-header">
                                Lượt góp ngày
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {chart[2][0]}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: '#02b9a8'}}>
                            <div className="card-header">
                                Tổng tiền ngày
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {chart[2][1].toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: '#ff7a81'}}>
                            <div className="card-header">
                                Lượt góp tháng
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {chart[2][2]}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card" style={{...cardBodyStyle, backgroundColor: '#ff7a81'}}>
                            <div className="card-header">
                                Tổng tiền tháng
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    {chart[2][3].toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <Bar data={barChartData} options={options}/>
                        <p className="mt-4" style={{textAlign: "center"}}>Báo Cáo Theo Ngày Trong Tháng</p>
                    </div>
                    <div className="col-md-4">
                        <Doughnut data={donutChartData}/>
                        <p className="mt-4" style={{textAlign: "center"}}>Tổng Tiền Theo Loại Dự Án</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default HomeAdmin;