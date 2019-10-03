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

    if (action.type === 'ERROR') {
        // const arraycode =  action.error.split("code")
        // const code = parseInt(arraycode[arraycode.length - 1])
        // var messagem = ''
        console.log('Erros: ', action, 'Code', action.code)
        // switch(code){
            
        //     case 400:
        //         messagem = 'Erro 400 (Bad Request): este erro normalmente ocorre quando o endereço WEB digitado contém um erro, ou quando o servidor não consegue interpretar o que foi solicitado. Erros de configuração do servidor também podem ocasionar o erro 400.' 
        //     break;
        //     case 401:
        //         messagem = 'Erro 401 (Unauthorized): este erro ocorre em páginas que necessitam de autenticação. São páginas que só podem ser acessados mediante login e senha ou por meio de outros tipos de identificação, como endereço IP, por exemplo. Se o usuário tentar acessar uma página e digitar um login ou senha inválida, o servidor retornará um erro 401.'
        //         break;
        //     case 403:
        //         messagem = 'Erro 403 (Forbidden): em alguns momentos, o erro 403 pode ser confundido com o 401, mas eles são diferentes. O erro 403 ocorre quando solicitamos algo, mas o servidor se recusa a executar. Um exemplo típico deste erro acontece quando tentamos listar os arquivos em um diretório protegido por configurações no .htaccess. Nestes casos, quando a solicitação de listagem é feita, o servidor retorna o erro 403.'
        //         break;
        //     case 404:
        //         messagem = 'Erro 404 (Not Found): o erro 404 é o mais comum de todos, praticamente todo mundo que usa a internet já se deparou com este erro. Ele avisa que um diretório ou arquivo não está disponível no servidor, podendo ter sido movido para outro endereço ou excluído de maneira definitiva.'
        //         break;
        //     case 500:
        //         messagem = '500 - Erro interno do servidor: Pelo fato de não ter conseguido executar o script devido a erros de programação ou problemas no servidor.'
        //         break;
        //     default:
        //         messagem = action.error
        //         break;                  
        // }    

        return {
            ...state,
            loading: true,
            error: action.code,
            code: action.code
        }
    }

    return state
}
export default Reducer
