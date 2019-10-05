import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const Header = () => {
	const [logado, setLogado] = useState(false)
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setLogado(true)
		} else {
			setLogado(false)
		}
	})

	const logout = () => {
		localStorage.removeItem('token')
		console.log('Saiu', localStorage.getItem('token'))
	}

	return <>
		<nav className='navbar navbar-light bg-light'>
			<div className='container'>
				<div className='navbar-brand' ><Link to={'/'}>My Money</Link></div>
				{ logado &&
					<ul className='nav-bar nav mr-auto'>
						<li>
							<button type='button' className='btn nav-link' onClick={logout} >Sair</button>
						</li>
					</ul>
				}
			</div>
		</nav>
	</>

}

export default Header