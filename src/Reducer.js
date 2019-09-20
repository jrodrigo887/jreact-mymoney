/**
 * 
 * @param {estado da aplicação } state 
 * @param {Ações que o reduce receberá} action
 * @module {Reducer para tratar os metódos dO CRUD} Reducer 
 */

const Reducer = (state, action) => {
    //faz a resquisição, e o load aparece acarregando
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: true,
            
        }
    }
    //caso ocorra tudo bem, apenas retorna o estado atual
    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }
    return state
}

export default Reducer
