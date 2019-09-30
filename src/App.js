import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './elements/nav'
import Home from './pages/Home'
import Movimentacao from './pages/Movimentacao'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div>
      
        <Header />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Home} />
        <Route path='/movimentacoes/:data' exact component={Movimentacao} />
      </div>
    </Router>
  )
}
export default App
