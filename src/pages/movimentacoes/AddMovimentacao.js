import React, {useState} from 'react'
// import { useApiMovimentacao } from '../../api/index'

const AddMovimentacao = ({SalvarMovimentacao}) => {
	//const { movimentacoes, salvarMovimentacao, deletarMovimentacao } = useApiMovimentacao(match.params.data)
	
	//gerir form
	const [descricao, setDescricao] = useState('')
	const [valor, setValor] = useState('')

	const salvarMovimentacao = async () => {
			if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
				await SalvarMovimentacao({
					descricao,
					valor: parseFloat(valor)
				})
				setDescricao('')
				setValor(0)
				
			}
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
			<td><button className='btn btn-success' onClick={salvarMovimentacao}>+</button></td>
		</tr>
	)
}
export default AddMovimentacao