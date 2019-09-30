import React, { useEffect } from 'react'

import { usePost } from '../util/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvdYm19JkYy7h0vHjrSi7nahGOGhqb-oM'

const Login = () => {
    const [login, setLogin] = usePost(url)
    useEffect(() => {
        if (login.loading === false || login.data.registered === true ||
            Object.keys(login.data).length > 0) {
            localStorage.setItem('token', login.data.idToken)
            console.log('Logou! ', login.data.idToken)

        } else {
            facalogin()
        }


    }, [login])
    const fazerLogin = async () => {
        const token = await setLogin({
            email: 'jrodrigo887@gmail.com',
            password: 'abc123',
            returnSecureToken: true
        })
        console.log('token >>>', token)
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

    return (
        <>
            {!login.loading === false && facalogin()}


            {
                login.loading === false &&
                <div>
                <h1>Login</h1>
                   <pre> JSON.stringify(login)</pre>
                </div>}
                <button onClick={fazerLogin}>Login</button>
        </>
    )

}

export default Login