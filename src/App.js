import React from 'react'
import Rest from './rest'

const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseurl)
const deletar = '-Lp5dH3WpGOLFKPY0KqQ'

function App() {
  const data = useGet('movement/2019-08')
  const [postData, post] = usePost('movement/2019-08')
  const [deleteData, remove] = useDelete()
  const newPost = () => {
    //inserindo um novo post na Api
    post({ valor: 37.20, description: 'gasolina comum' })

  }
  const doRemove = () => {
    remove(`movement/2019-08/${deletar}`)
  }
  return (
    <div >
      <h1>My Money</h1>
      {data.loading && <span>loading...</span>}
      {data.data && <span>: data:</span>}
      <button onClick={newPost}>Salvar</button>
      <button onClick={doRemove}>Deletar</button>
      <pre>{JSON.stringify(postData)}</pre>

    </div>
  )
}
export default App
