import { useReducer } from 'react'
import axios from 'axios'

//função pura
const reducer = (state, action) => {
    //faz a resquisição, e o load aparece carregando
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: false
        }
    }
    //caso ocorra tudo bem, apenas retorna o estado atual
    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: true
        }
    }
    return state
}

const useDelete = (url) => {
    const [data, dispatch] = useReducer(reducer, {
        loading: false,
        data: {}
    })
    const remove = url => {
        dispatch({ type: 'REQUEST' })
        axios
            .delete(url)
            .then(() => {
                dispatch({
                type: 'SUCCESS', 
            })
        })
    }
    return [data, remove]
}
export default useDelete
