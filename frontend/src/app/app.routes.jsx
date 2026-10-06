import { createBrowserRouter } from 'react-router';
import { Register } from '../features/auth/pages/register';
import { Login } from '../features/auth/pages/login';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1 className='text-white p-8 text-center text-xl font-mono'>SNITCH ATELIER HOME</h1>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])