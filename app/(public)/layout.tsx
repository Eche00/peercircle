import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react'

function Publiclayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            <main className="bg-[#0B0B0B] text-white min-h-screen pt-18">{children}</main>
            <Footer />
        </>
    )
}

export default Publiclayout