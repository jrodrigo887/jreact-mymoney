import { useReducer } from 'react'
import axios from 'axios'
import reducer from './Reducer'

const UsePost = (url) => {
    const [data, dispatch] = useReducer(reducer, {
        loading: false,
        data: {}
    })

    const post = data => {
        dispatch({ type: 'REQUEST' })
        axios
            .post(url, data)
            .then(resp => {
                dispatch({
                type: 'SUCCESS', 
                data: resp.data
            })
        })
    }
    return [data, post]
}

export default UsePost
