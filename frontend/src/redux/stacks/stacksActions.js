import axios from "axios"
import { fillStacks, stacksFail, stacksRequest } from "./stacksSlice"
import endpoints from "../../services/endpoints"

export const actionGetStack = () => {
    return async (dispatch) => {
        dispatch(stacksRequest())
        try {
            const {data} = await axios.get(endpoints.getStacks)
            dispatch(fillStacks(data))
        } catch (error) {
            console.error(error);
            dispatch(stacksFail(error.message))
        }
    }
}

