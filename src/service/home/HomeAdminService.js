import axios from "axios";


const apiAdmin = "http://localhost:8080/api/admin";

export const getChart = async () => {
    return await axios.get(apiAdmin + `/home/chart`);
}

export const getDaysOfMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Tính số ngày của tháng hiện tại
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Tạo mảng chứa các ngày của tháng
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }

    return daysArray;
}
