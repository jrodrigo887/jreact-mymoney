import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import Rest from '../util/rest'
const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseurl)

const Movimentacao = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const [dataPatch, patch] = usePatch('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
    const [deletarDados, deletar] = useDelete()

    const verificarAnoMes = (valueParams) => {

        //array para mostrar em tela o mês selecionado. 
        const mesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro']

        //tratamento para retorna mẽs em string mais ano.
        const ano = valueParams.substring(0, 4)
        const indexMes = parseInt(valueParams.substring(valueParams.indexOf('-') + 1))

        return mesArray[indexMes - 1] + ' de ' + ano
    }

    //Refresh da página mês
    const refetchMes = (time) => {
        setTimeout(() => {
            dataMeses.refetch()
        }, time)

    }

    const SalvarMovimentacao = async () => {

        if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            await salvar({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor('')
            data.refetch()
            refetchMes(2000)
        }
    }

    const handleDeletar = async (id) => {
        await deletar(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
        refetchMes(2000)
    }

    const onChangeDesc = evt => {
        setDescricao(evt.target.value)

    }

    const onChangeValor = evt => {
        setValor(evt.target.value)
    }

    const alterarEntrada = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value })
        refetchMes(2000)
    }

    const alterarSaida = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value })
        refetchMes(2000)
    }

    if (data.error === 'Permission denied') {
        console.log('Teste de redir', data.error)
        return <Redirect to='/login' />
    }

    return (
        <>
            <div className='container'>
                <h1>Movimentações do mês de {verificarAnoMes(match.params.data)}</h1>

                {
                    !dataMeses.loading && dataMeses.data && <div>
                        Previsão de Entrada: {dataMeses.data.previsao_entrada} {' '}
                        <input type='text' onBlur={alterarEntrada} /> /
Previsão de Saida {dataMeses.data.previsao_saida} {' '}/
<input type='text' onBlur={alterarSaida} />
                        Entradas: {dataMeses.data.entradas} /
saídas: {dataMeses.data.saidas}
                    </div>
                }
                <table className='table table-hover table-sm'>
                    <thead className='thead-dark'>
                        <tr>
                            <th >Descrição</th>
                            <th >valor</th>
                            <th >Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data &&
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
            </div>
        </>
    )
}

export default Movimentacao