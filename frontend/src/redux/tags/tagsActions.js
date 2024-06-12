import axios from "axios"
import endpoints from "../../services/endpoints"
import { fillTags, tagsFail, tagsRequest } from "./tagsSlice"

export const actionGetTags = () => {
    return async (dispatch) => {
        dispatch(tagsRequest())
        try {
            const {data} = await axios.get(endpoints.getTags)
            dispatch(fillTags(data))
        } catch (error) {
            console.error(error);
            dispatch(tagsFail(error.message))
        }
    }
}
