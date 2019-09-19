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
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand'>My Money</a>
        </div>
      </nav>
      <div className='container'>
        <h5>Adicione Ano e mês</h5>
        <select className='custom-select'>
          <option value='2019'>2019</option>
          <option value='2020'>2020</option>
        </select><br /><br />
        <select className='custom-select'>
          <option value='08'>08</option>
          <option value='09'>09</option>
        </select>

        <table className='table table-hover table-sm'>
          <thead className='thead-dark'>
            <tr>
              <th className='col'>Descrição</th>
              <th className='col'>Valor</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(data.data)
                .map(mes => {
                  return (
                  <tr key={mes}>
                    
                    <td>{data.data[mes].description}</td>
                    <td>{data.data[mes].valor}</td>
                  </tr>
                  )
                })
            }
          </tbody>

        </table>
      </div>
      {!data.loading && <span>loading...</span>}
    </div>
  )
}
export default App
