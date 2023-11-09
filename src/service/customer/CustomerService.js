import axios from "axios";


const apiCustomer = "http://localhost:8080/api/customer";


export const getHistory = async (data) => {
    return await axios.get(apiCustomer + `/infoHistory?limit=${data}`);
}

export const getInfo = async () => {
    return await axios.get(apiCustomer + `/infoCustomer`);
}

export const edit = async (data) => {
    return await axios.put(apiCustomer + `/editCustomer`, data);
}
