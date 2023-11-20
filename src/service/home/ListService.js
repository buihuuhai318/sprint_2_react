import axios from "axios";

const apiList = "http://localhost:8080/api/charitable";


export const getProject = async (id, limit) => {
    return await axios.get(apiList + `/type/${id}?limit=${limit}`);
}

export const getProjectByCompany = async (id, limit) => {
    return await axios.get(apiList + `/company/${id}?limit=${limit}`);
}

export const getListType = async (id) => {
    return await axios.get(apiList + `/types/${id}`);
}

export const getListCompany = async (id) => {
    return await axios.get(apiList + `/companies/${id}`);
}

export const getProjectBySearch = async (value, limit) => {
    return await axios.get(apiList + `/search?limit=${limit}&value=${value}`);
}


