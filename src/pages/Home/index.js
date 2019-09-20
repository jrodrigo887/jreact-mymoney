import React from 'react'

import Meses from './Meses'
import AddMes from './AddMes'

const Home = () => (
    <div >
        <div className='container'>
            <AddMes />
            <Meses />
        </div>
    </div>
)

export default Home