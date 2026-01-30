import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react'

function Publiclayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            <main className="bg-[#191A1E] text-white min-h-screen pt-20">{children}</main>
            <Footer />
        </>
    )
}

export default Publiclayout