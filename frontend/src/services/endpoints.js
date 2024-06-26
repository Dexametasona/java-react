const URL_BASE = `https://java-react.onrender.com/api/v1/`

const endpoints ={
    login: `${URL_BASE}auth/login`,
    getUser: `${URL_BASE}user`,
    getStacks: `${URL_BASE}stack`,
    getRequestByUser: `${URL_BASE}join-request/from-current-user`,
    getRequestByProject:(idProject) => `${URL_BASE}join-request/to-proyecto/${idProject}`,
    getRequestFromUser:(idUser) => `${URL_BASE}join-request/to-user/${idUser}`,
    postRequest: `${URL_BASE}join-request`,
    cancelRequest:(idRequest) => `${URL_BASE}join-request/cancel/${idRequest}`,
    rejectRequest:(idRequest) => `${URL_BASE}join-request/reject/${idRequest}`,
    acceptRequest:(idRequest) => `${URL_BASE}join-request/accept/${idRequest}`,
    getTags: `${URL_BASE}tag`,
    getRoles: `${URL_BASE}position/role`,
    postPosition: `${URL_BASE}position`,
    getProjectFilter: (filter) => `${URL_BASE}proyecto/role/${filter}`,
    getAllProjects: `${URL_BASE}proyecto`,
    getUserProjects: `${URL_BASE}proyecto/owner`,
    getProjectsById: (id) => `${URL_BASE}proyecto/${id}`
}

export default endpoints

