import axios from "axios";


const apiEmployee = "http://localhost:8080/api/employee";


export const getInfo = async () => {
    return await axios.get(apiEmployee + `/infoEmployee`);
}

export const edit = async (data) => {
    return await axios.put(apiEmployee + `/editEmployee`, data);
}
