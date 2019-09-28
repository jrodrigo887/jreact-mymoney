import { useReducer, useEffect } from 'react'
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
    //uso do método carregar para dá refresh na página.
    const carregar = async () => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.get(baseUrl + resource + '.json')
      dispatch({ type: 'SUCCESS', data: res.data })
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
      dispatch({ type: 'REQUEST' })

      const res = await axios.post(baseUrl + resource + '.json', data)
      dispatch({ type: 'SUCCESS', data: res.data })
     
    }
    return [data, post]
  }

  //delete
  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const remove = async (resource) => {
      dispatch({ type: 'REQUEST' })
      await axios.delete(baseUrl + resource + '.json')
      dispatch({ type: 'SUCCESS' })
    }
    return [data, remove]
  }

  //patch
  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const patch = async (resource, data) => {
      dispatch({ type: 'REQUEST' })
      await axios.patch(baseUrl + resource + '.json', data)
      dispatch({ type: 'SUCCESS' })
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
export default Rest