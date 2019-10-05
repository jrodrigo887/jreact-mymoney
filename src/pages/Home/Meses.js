import React from 'react'
import { Link , Redirect} from 'react-router-dom'

import Rest from '../../util/rest'

const baseurl = 'https://mymoney-jreact887.firebaseio.com/'
const { useGet } = Rest(baseurl)

const Meses = () => {
	const data = useGet('meses')
	console.log(data.data)
	if (data.loading) {
		return <span>loading...</span>
	}
	if (data.error && data.error === 'Permission denied') {
		return <Redirect to='/login' />
	}

	if (Object.keys(data.data).length > 0) {
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
								console.log('Saidas', data.data[mes].saidas)
								console.log('Saidas', data.data[mes].entradas)
								return (
									<tr key={mes}>
										<td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
										<td>{data.data[mes].previsao_entrada}</td>
										<td>{data.data[mes].entradas}</td>
										<td>{data.data[mes].previsao_saida}</td>
										<td>{data.data[mes].saidas}</td>
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