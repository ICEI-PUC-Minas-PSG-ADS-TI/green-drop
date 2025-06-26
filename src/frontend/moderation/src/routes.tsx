import React, { ReactNode } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { AuthLayout } from './pages/_layouts/auth'
import { AppLayout } from './pages/_layouts/app'
import { SignIn } from './pages/auth/sign-in'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Orders } from './pages/app/orders/orders'
import { Error } from './pages/error'
import { NotFound } from './pages/404'

function ProtectedRoute({ children }: { children?: ReactNode }) {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/" replace />;
	}

	return children ? children : <Outlet />;
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthLayout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <SignIn /> }
		],
	},
	{
		element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Navigate to='dashboard' replace /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'orders', element: <Orders /> },
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
