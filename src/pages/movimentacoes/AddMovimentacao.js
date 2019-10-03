import React, {useState} from 'react'
// import { useApiMovimentacao } from '../../api/index'

const AddMovimentacao = () => {
	//const { movimentacoes, salvarMovimentacao, deletarMovimentacao } = useApiMovimentacao(match.params.data)
	
	//gerir form
	const [descricao, setDescricao] = useState('')
	const [valor, setValor] = useState('')


	const SalvarMovimentacao = async () => {
		/*	if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
				await salvarMovimentacao({
					descricao,
					valor: parseFloat(valor)
				})
				setDescricao('')
				setValor('')
				movimentacoes.refetch()
			}*/
		}

		//input setar descriação  
		const onChangeDesc = evt => {
			setDescricao(evt.target.value)
		}
	
		//input setar valor
		const onChangeValor = evt => {
			setValor(evt.target.value)
		}
	
	return (
		<tr>
			<td>Nova Descrição:{' '}
				<input type='text' defaultValue={descricao} onChange={onChangeDesc} />
			</td>
			<td>Valor: {' '}
				<input type='text' defaultValue={valor} onChange={onChangeValor} />{'  '}
			</td>
			<td><button className='btn btn-success' onClick={SalvarMovimentacao}>+</button></td>
		</tr>
	)
}
export default AddMovimentacao