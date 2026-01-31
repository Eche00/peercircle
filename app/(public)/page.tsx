import React from 'react'
import Hero from './homepage/Hero'
import Aim from './homepage/Aim'
import Faqs from './homepage/Faqs'

function page() {
    return (
        <div>
            {/* Homepage container */}
            <main>
                <Hero />
                <Aim />
                <Faqs />
            </main>
        </div>
    )
}

export default page