import  {useReducer, useEffect} from 'react'
import axios from 'axios'
import reducer from './Reducer'

  const GetUrl = url => {
    const [data, dispatch] = useReducer(reducer, {
      loading: true,
      data: {}
    })
    useEffect(() => {
      dispatch({ type: 'REQUEST' })
      axios
        .get(url)
        .then(resp => {
          console.log('Chamou os dados: ', resp.data)
          dispatch({ type: 'SUCCESS', data: resp.data })
        })
    }, [url])
    return data
  }

  export default GetUrl