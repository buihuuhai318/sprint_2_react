import axios from "axios";

const apiCart = "http://localhost:8080/api/cart";


export const addToCart = async (data) => {
    return await axios.post(apiCart + `/add`, data);
}

export const getMoneyCart = async () => {
    return await axios.get(apiCart + `/getMoneyCart`);
}

export const getCarts = async () => {
    return await axios.get(apiCart + `/getCarts`);
}

export const getBill = async () => {
    return await axios.get(apiCart + `/getBill`);
}

export const getBillTotal = async (data) => {
    return await axios.post(apiCart + `/getBillDone`, data);
}

export const delCart = async (id) => {
    return await axios.delete(apiCart + `/deleteCart/${id}`);
}


