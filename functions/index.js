const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

exports.soma = functions.database.ref('/movimentacao/{dia}')
    .onWrite(async(change, context)=> {
        const mesesRef = admin.database(). ref('/meses/'+context.params.dia)
        const movimentacaoRef= change.after.ref
        const movimentacaoSS = await movimentacaoRef.once('value')
        const movimentacao = movimentacaoSS.val()

        let entradas = 0
        let saidas = 0

        Object.keys(movimentacao).forEach(m => {
            if(movimentacao[m].valor > 0){
                entradas += movimentacao[m].valor
            }else{
                saidas += movimentacao[m].valor
            }
        })

        return mesesRef.transaction(current => {
            if(current === null){
                return{
                    entrada,
                    saida,
                    previsao_entrada: 0,
                    previsao_saida: 0
                }
            }
            return {
                ...current,
                entrada,
                saida
            }
        })
    })
