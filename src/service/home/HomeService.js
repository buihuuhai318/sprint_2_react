import axios from "axios";


const apiHome = "http://localhost:8080/api/home";


export const listType = async () => {
    return await axios.get(apiHome + `/types`);
}

export const listProject = async () => {
    return await axios.get(apiHome + `/projects`);
}

export const getProject = async (id) => {
    return await axios.get(apiHome + `/project/${id}`);
}

export const listCompany = async () => {
    return await axios.get(apiHome + `/companies`);
}

export const getProjectOther = async (limit) => {
    return await axios.get(apiHome + `/projects/getOther?limit=${limit}`);
}


