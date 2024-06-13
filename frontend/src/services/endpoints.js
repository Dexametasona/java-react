const URL_BASE = `https://java-react.onrender.com/api/v1/`

const endpoints ={
    login: `${URL_BASE}auth/login`,
    getUser: `${URL_BASE}user`,
    getStacks: `${URL_BASE}stack`,
    getRequestByUser: `${URL_BASE}join-request/from-current-user`,
    postRequest: `${URL_BASE}join-request`,
    cancelRequest:(idRequest) => `${URL_BASE}join-request/cancel/${idRequest}`,
    getTags: `${URL_BASE}tag`,
    getRoles: `${URL_BASE}position/role`,
    getProjectFilter: (filter) => `${URL_BASE}proyecto/role/${filter}`,
    getAllProjects: `${URL_BASE}proyecto`,
    getUserProjects: `${URL_BASE}proyecto/owner`,
    getProjectsById: (id) => `${URL_BASE}proyecto/${id}`
}

export default endpoints

