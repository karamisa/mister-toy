
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { UserMsg } from './user-msg.jsx'

export function AppHeader() {

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <header>
            <UserMsg />
            <div className='app-header'>
                <div>LOGO</div>
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/toy">Toys</NavLink> |
                    <NavLink to="/about">About</NavLink>
                </nav>
            </div>
        </header>
    )
}
