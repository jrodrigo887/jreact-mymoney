import {useReducer, useEffect} from 'react'
import reducer from './Reducer'
import axios from 'axios'
// const baseurl = 'https://mymoney-jreact887.firebaseio.com/'

const INITIAL_STATE = {
    loading: true,
    data: {}
  }

const Rest = baseUrl => {
    //get
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    useEffect(() => {
      dispatch({ type: 'REQUEST' })
      axios
        .get(baseUrl + resource + '.json')
        .then(resp => {
          console.log('Chamou os dados: ', resp.data)
          dispatch({ type: 'SUCCESS', data: resp.data })
        })
    }, [resource])
    return data
  }

  //Post
  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const post = resource => {
        dispatch({ type: 'REQUEST' })
        axios
            .post(baseUrl + resource + '.json', data)
            .then(resp => {
                dispatch({
                type: 'SUCCESS', 
                data: resp.data
            })
        })
    }
    return [data, post]
}

const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const remove = resource => {
        dispatch({ type: 'REQUEST' })
        axios
            .delete(baseUrl + resource + '.json')
            .then(() => {
                dispatch({
                type: 'SUCCESS', 
            })
        })
    }
    return [data, remove]
}

  return { 
      useGet,
      usePost,
      useDelete
     }
}
  export default Rest