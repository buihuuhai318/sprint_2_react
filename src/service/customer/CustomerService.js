import axios from "axios";


const apiCustomer = "http://localhost:8080/api/customer";


export const getInfo = async (data) => {
    return await axios.get(apiCustomer + `/info?limit=${data}`);
}
