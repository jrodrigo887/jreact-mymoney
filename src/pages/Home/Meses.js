import React from 'react'
import {Link} from 'react-router-dom'

import Rest from '../../util/rest'

const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const { useGet } = Rest(baseurl)

const Meses = () => {
    const data = useGet('meses')
    if (data.loading) {
        return <span>loading...</span>
    }
   if (data.data){
    return (
        
        <table className='table table-hover table-sm'>
            <thead className='thead-dark'>
                <tr>
                    <th >Mês</th>
                    <th >Previsão Entrada</th>
                    <th >Entrada</th>
                    <th >Previsão Saída</th>
                    <th >Saída</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(data.data)
                        .map(mes => {
                            return (
                                <tr key={mes}>
                                    <td><Link to={`/movimentacao/${mes}`}>{mes}</Link></td>
                                    <td>{data.data[mes].previsao_entrada}</td>
                                    <td>{data.data[mes].entrada}</td>
                                    <td>{data.data[mes].previsao_saida}</td>
                                    <td>{data.data[mes].saida}</td>
                                </tr>
                            )
                        })
                }
            </tbody>
        </table>
    )
  }
  return null
}


export default Meses