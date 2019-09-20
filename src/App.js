import React from 'react'
//import Rest from './rest'
import Header from './elements/nav'
import Meses from './Meses'
import AddMes from './AddMes'
const deletar = '-Lp5dH3WpGOLFKPY0KqQ'

function App() {
  // const data = useGet('meses')
  // const [postData, post] = usePost('movement/2019-08')
  //const [deleteData, remove] = useDelete()

  const newPost = () => {
    //inserindo um novo post na Api
    //post({ valor: 37.20, description: 'gasolina comum' })

  }
  const doRemove = () => {
    //remove(`movement/meses/2019-08/${deletar}`)
  }
  return (
    <div >
      <Header />
      <div className='container'>
        <AddMes />
        <Meses />
      </div>
    </div>
  )
}
export default App
