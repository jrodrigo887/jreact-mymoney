import React, { useRef, useState } from 'react'
import { Redirect } from "react-router-dom"
const minAno = 2019
const maxAno = 2022


const AddMes = () => {
    const anos = []
    const meses = []
    const refAno = useRef('')
    const refMes = useRef('')
    const [redir, setRedir] = useState('')

    for (let i = minAno; i <= maxAno; i++) {
        anos.push(i)
    }

    for (let i = 1; i <= 12; i++) {
        meses.push(i)
    }


    const zeroPad = valor => {
        if (valor < 10) {
            return '0' + valor
        }
        return valor
    }

    const verMes = () => {
        const filepath =refAno.current.value+'-'+refMes.current.value
        setRedir(filepath)
        console.log("path:",filepath)
        console.log('redir', redir)

          if(filepath!==""){
              console.log('chamou o redirect!','/movimentacao/'+filepath )
             return <Redirect to={'/movimentacao/'+filepath} />
             
          }    
    }



    return (
        <>
            <h4>Adicionar Mês</h4>
            <select ref={refAno}>
                {anos.map(ano => { return <option key={ano} value={ano}>{ano}</option> })}
            </select>
            <select ref={refMes}>
                {meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option>)}
            </select>
            <button onClick={verMes}>Add Mês</button>
        </>
    )
}

export default AddMes