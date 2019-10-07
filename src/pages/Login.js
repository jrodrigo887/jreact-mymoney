import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { usePost } from '../util/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvdYm19JkYy7h0vHjrSi7nahGOGhqb-oM'

const Login = () => {
	const [login, setLogin] = usePost(url)
	const [logado, setLogado] = useState(false)
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState(0)
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
			email,
			password: senha,
			returnSecureToken: true
		})

	}

	const onChangeEmail = (evt) => {
		setEmail(evt.target.value)
	}
	const onChangeSenha = (evt) => {
		setSenha(evt.target.value)
	}

	const facalogin = () => {
		return (
			<>

			</>
		)
	}
	if (logado) {
		return <Redirect to='/' />
	}
	return (
		<>
			<div className='container d-flex justify-content-lg-center'>
				{
					login.error && login.error.length > 0 &&

					<div>
						<p>Email e/ou Senha inválido.</p>
					</div>
				}
				<div className='card'>
					<h5 className='card-header'>Faça Login!</h5>
					<div className='card-body' >
						<div class="form-row">
							<div class="form-group col-lg-12">
								<input type='email' value={email} onChange={onChangeEmail} placeholder='E-mail' className='form-control sm'></input>
							</div>
						</div>
						<div class="form-row">
							<div class="form-group col-lg-12">
								<input type='password' value={senha} onChange={onChangeSenha} placeholder='Senha' className='form-control sm'></input>
							</div>
						</div>
					</div>

					<div class="form-group row justify-content-center">
						<div class="col-sm-10">
							<button type="submit" className="btn btn-primary" onClick={fazerLogin}>Sign in</button>
						</div>
					</div>


				</div>
				<pre>{JSON.stringify(login)}</pre>
			</div>
		</>
	)
}

export default Login