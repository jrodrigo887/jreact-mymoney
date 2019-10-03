
import Rest from '../util/rest'
const baseurl = 'https://mymoney-jreact887.firebaseio.com/'

	const { useGet, usePost, useDelete, usePatch } = Rest(baseurl)
	//cutom hooks
	export const useApiMovimentacao = (data) => {
		const movimentacoes = useGet(data)
		const [postData, salvarMovimentacao] = usePost(`movimentacoes/${data}`)
		const [deletarDados, deletarMovimentacao] = useDelete()
		return { movimentacoes, salvarMovimentacao, deletarMovimentacao }
	}
	//custom hooks
	export const useApiMes = (data) => {
		const infoMes = useGet(data)
		const [dataPatch, alterarMes] = usePatch(`meses/${data}`)
		return { infoMes, alterarMes }
	}


