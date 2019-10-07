import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useApiMovimentacao } from '../../api/index'
import InfoMes  from './infoMes'
import AddMovimentacao from './AddMovimentacao'

const Movimentacao = ({ match }) => {
	const { movimentacoes, salvarMovimentacao, deletarMovimentacao } = useApiMovimentacao(match.params.data)

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

	const SalvarMovimentacao = async (dados) => {
			await salvarMovimentacao(dados)
			movimentacoes.refetch()
		
	}

	const handleDeletar = async (id) => {
		await deletarMovimentacao(`movimentacoes/${match.params.data}/${id}`)
		movimentacoes.refetch()
	}

	if (movimentacoes.error === 'Permission denied') {
		console.log('Teste de redir', movimentacoes.error.code)
		return <Redirect to='/login' />
	}

	return (
		<>
			<div className='container'>
				<h1>Movimentações do mês de {verificarAnoMes(match.params.data)}</h1>
				<InfoMes data={match.params.data} />
			
				<table className='table table-hover table-sm'>
					<thead className='thead-dark'>
						<tr>
							<th >Descrição</th>
							<th >valor</th>
							<th >Ação</th>
						</tr>
					</thead>
					<tbody>
						{movimentacoes.data &&
							Object.keys(movimentacoes.data)
								.map(detalhes => {
									return (
										<tr key={detalhes}>
											<td>{movimentacoes.data[detalhes].descricao}</td>
											<td>{movimentacoes.data[detalhes].valor}</td>
											<td><button className='btn btn-danger' onClick={() => handleDeletar(detalhes)}>Deletar</button></td>
										</tr>
									)
								})
						}
						<AddMovimentacao salvarMovimentacao={SalvarMovimentacao} />
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Movimentacao