import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import Personal from '@/pages/Personal';
import Settings from '@/pages/Settings';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/personal",
        element: <Personal />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
])