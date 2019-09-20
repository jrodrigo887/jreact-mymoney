import React from 'react'

import { Link } from 'react-router-dom'

const Header = () => {
    return <>
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <div className='navbar-brand' ><Link to={'/'}>My Money</Link></div>
            </div>
        </nav>
    </>
}

export default Header