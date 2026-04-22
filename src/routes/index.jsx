import React from 'react'
import RootLayout from '../RootLayout';
import Home from '../pages/Home';
import Characters from '../pages/Characters';
import { createBrowserRouter } from 'react-router-dom';
import CharacterDetails from '../pages/CharacterDetails';
import FavoriteCharacters from '../pages/FavoriteCharacters';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/characters",
                element: <Characters />
            },
            {
                path:"/characters/:id",
                element: <CharacterDetails />
            },
            {
                path:"/favorites",
                element: <FavoriteCharacters />
            }
        ]
    }
]);