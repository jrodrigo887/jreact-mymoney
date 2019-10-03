import React from 'react'
import { useApiMes } from '../../api'



const InfoMes = ({data}) => {
	const {infoMes, alterarMes } = useApiMes(data)

	//Refresh da página mês
	const refetchMes = (time) => {
		setTimeout(() => {
			infoMes.refetch()
		}, time)
	}

	const alterarEntrada = (evt) => {
		alterarMes({ previsao_entrada: evt.target.value })
		refetchMes(2000)
	}
	const alterarSaida = (evt) => {
		alterarMes({ previsao_saida: evt.target.value })
		refetchMes(2000)
	}

	if (infoMes.loading === true) {
		return <p>Caregando dados do Mẽs</p>
	}

	if (infoMes.data) {
		return (
			<div>
				Previsão de Entrada: {infoMes.data.previsao_entrada} {' '}
				<input type='text' onBlur={alterarEntrada} /> 
				
				/Previsão de Saida {infoMes.data.previsao_saida} {' '}/
				<input type='text' onBlur={alterarSaida} />Entradas: {infoMes.data.entradas} /
				saídas: {infoMes.data.saidas}
			</div>
		)
	}
	return null
}

export default InfoMes