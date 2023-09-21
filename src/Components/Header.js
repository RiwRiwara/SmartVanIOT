import React from 'react'
import ResponsiveAppBar from './Appbar'

export default function Header() {

    return (
        <header className="shadow-md sticky-nav" style={{ backgroundColor: "#829BDD" }}>
            <ResponsiveAppBar />
        </header>
    )
}
