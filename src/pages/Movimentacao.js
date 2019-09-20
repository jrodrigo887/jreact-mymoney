import React from 'react'

import Rest from '../util/rest'
const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const { useGet } = Rest(baseurl)

const Movimentacao = ({ match }) => {
    const data = useGet(`movimentacao/${match.params.data}`)

    if (data.loading) {
        return (<span>Loading...</span>)
    }
    return (
        <>
            <div className='container'>
                <h1>Movimentação do Mês - {match.params.data}</h1>
                <pre>{JSON.stringify(data)}</pre>

                {data.data &&
                    <table className='table table-hover table-sm'>
                        <thead className='thead-dark'>
                            <tr>
                                <th >Descrição</th>
                                <th >valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(data.data)
                                    .map(detalhes => {
                                        return (
                                            <tr key={detalhes}>
                                                <td>{data.data[detalhes].descricao}</td>
                                                <td>{data.data[detalhes].valor}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

export default Movimentacao