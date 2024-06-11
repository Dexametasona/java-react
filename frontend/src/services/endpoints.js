const URL_BASE = `https://java-react.onrender.com/api/v1/`

const endpoints ={
    login: `${URL_BASE}auth/login`,
    getUser: `${URL_BASE}user`,
    getStacks: `${URL_BASE}stack`,
    getTags: `${URL_BASE}tag`,
    getAllProjects: `${URL_BASE}proyecto`,
    getProjectsById: (id) => `${URL_BASE}proyecto/${id}`
}

export default endpoints

