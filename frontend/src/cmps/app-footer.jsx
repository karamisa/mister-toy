import { useEffect } from 'react'

export function AppFooter () {

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <footer>
            <p>
                coffeerights to all
            </p>
        </footer>
    )

}