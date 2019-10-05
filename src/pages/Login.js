import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { usePost } from '../util/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvdYm19JkYy7h0vHjrSi7nahGOGhqb-oM'

const Login = () => {
	const [login, setLogin] = usePost(url)
	const [logado, setLogado] = useState(false)
	useEffect(() => {
		if (login.loading === false || login.data.registered === true ||
			Object.keys(login.data).length > 0) {
			localStorage.setItem('token', login.data.idToken)
			window.location.reload()

		}
	}, [login])

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setLogado(true)
		}
	})

	const fazerLogin = async () => {
		const token = await setLogin({
			email: 'jrodrigo887@gmail.com',
			password: 'abc123',
			returnSecureToken: true
		})

	}

	const facalogin = () => {
		return (
			<>
				<div>
					<h1>Faça Login!</h1>
				</div>
			</>
		)
	}
	if (logado) {
		return <Redirect to='/' />
	}
	return (
		<>
			{!login.loading === false && facalogin()}
			{
				login.loading === false &&
				<div>
					<h1>Login</h1>

				</div>}
			<button onClick={fazerLogin}>Login</button>
			<pre>{JSON.stringify(login)}</pre>
		</>
	)
}

export default Login