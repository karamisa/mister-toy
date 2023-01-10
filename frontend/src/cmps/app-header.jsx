
import { useEffect } from 'react'
import ResponsiveAppBar from './responsive-app-bar.jsx'

import { UserMsg } from './user-msg.jsx'

export function AppHeader() {

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <header>
            <UserMsg />
            <ResponsiveAppBar />
        </header>
    )
}
