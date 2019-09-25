import React, { useState } from 'react'

import Rest from '../util/rest'

const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseurl)

const Movimentacao = ({ match }) => {
    const data = useGet(`movimentacao/${match.params.data}`)

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [postData, salvar] = usePost(`movimentacao/${match.params.data}`)
    const [deletarDados, deletar] = useDelete()

    const SalvarMovimentacao = async () => {

        if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            await salvar({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor('')
            data.refetch()
        }
    }

    const handleDeletar = async (id) => {
        await deletar(`movimentacao/${match.params.data}/${id}`)
        data.refetch()
    }

    const onChangeDesc = evt => {
        setDescricao(evt.target.value)

    }

    const onChangeValor = evt => {
        setValor(evt.target.value)
        console.log(evt.target.value)
    }

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
                                <th >Ação</th>
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
                                                <td><button className='btn btn-danger' onClick={() => handleDeletar(detalhes)}>Deletar</button></td>
                                            </tr>
                                        )
                                    })
                            }
                              
                            <tr>
                                <td>Nova Descrição:{' '}
                                <input type='text' defaultValue={descricao} onChange={onChangeDesc}>
                                    </input>
                                </td>
                                <td>Valor: {' '}
                                <input type='text' defaultValue={valor} onChange={onChangeValor} />{'  '}
                                </td>
                                <td><button className='btn btn-success' onClick={SalvarMovimentacao}>+</button></td>
                            </tr>
                              
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

export default Movimentacao