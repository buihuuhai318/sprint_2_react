import axios from "axios";


const apiAccount = "http://localhost:8080/api/home";


export const listType = async () => {
    return await axios.get(apiAccount + `/types`);
}

export const listProject = async () => {
    return await axios.get(apiAccount + `/projects`);
}

export const getProject = async (id) => {
    return await axios.get(apiAccount + `/project/${id}`);
}

export const listCompany = async () => {
    return await axios.get(apiAccount + `/companies`);
}


