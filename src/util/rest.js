import { useReducer, useEffect } from 'react'
import reducer from './Reducer'
import axios from 'axios'
axios.defaults.validateStatus = code => code < 500

// const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const INITIAL_STATE = {
  loading: true,
  data: {},
  error: ''
}

const Rest = baseUrl => {

  //get
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    //uso do método carregar para dá refresh na página.
    const carregar = async () => {
      try {
        dispatch({ type: REQUEST })
        const res = await axios.get(baseUrl + resource + '.json')
        console.log('useget', res.data)
        if (res.data.error && Object.keys(res.data.error).length > 0) {
          dispatch({ type: ERROR, data: res.data.error, code: res.data.error})
        } else {
          dispatch({ type: SUCCESS, data: res.data })
          
        }        
      } catch (err) {
        dispatch({ type: ERROR, error: err.message })
      }
    }
    useEffect(() => {
      carregar()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource])
    return {
      ...data,
      refetch: carregar
    }
  }

  //Post
  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const post = async (data) => {
      dispatch({ type: REQUEST })

      const res = await axios.post(baseUrl + resource + '.json', data)
      dispatch({ type: SUCCESS, data: res.data })

    }
    return [data, post]
  }

  //delete
  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const remove = async (resource) => {
      dispatch({ type: REQUEST })
      await axios.delete(baseUrl + resource + '.json')
      dispatch({ type: SUCCESS })
    }
    return [data, remove]
  }

  //patch
  const usePatch = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const patch = async (data) => {
      dispatch({ type: REQUEST })
      await axios.patch(baseUrl + resource + '.json', data)
      dispatch({ type: SUCCESS })
    }
    return [data, patch]
  }

  return {
    useGet,
    usePost,
    useDelete,
    usePatch
  }
}

export const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)


  const post = async (data) => {
    dispatch({ type: REQUEST })

    try {

      const res = await axios.post(resource, data)
      console.log(res.data)
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({ type: ERROR, data: res.data.error.message })
      } else {
        dispatch({ type: SUCCESS, data: res.data })
        return res.data
      }

    } catch (err) {
      console.log(err.message)
      dispatch({ type: ERROR, error: err.message })
    }

  }
  return [data, post]

}

export default Rest