import React from 'react'
import Hero from './homepage/Hero'
import Aim from './homepage/Aim'

function page() {
    return (
        <div>
            {/* container */}
            <main>
                <Hero />
                <Aim />
            </main>
        </div>
    )
}

export default page