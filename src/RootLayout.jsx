import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {
   return (
    <div>
        <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
            Rick & Morty Explorer
        </h1>
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Rick & Morty</h1>
            <div className="flex gap-4">
                <Link to="/" className="hover:underline">
                Inicio
                </Link>
                <Link to="/characters" className="hover:underline">
                Personajes
                </Link>
                <Link to="/favorites" className="hover:underline">
                Favoritos
                </Link>
            </div>
            </nav>
        </header>

        <main className="container mx-auto p-6">
            <Outlet />
        </main>

        <footer className="text-center text-sm text-gray-500 p-6">
            © 2026 Rick & Morty Explorer
        </footer>
        </div>
    </div>
  );
}

export default RootLayout