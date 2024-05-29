import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Discover from "./roots/Discover.jsx";
import Inbox from "./roots/Inbox.jsx";
import Forum from "./roots/Forum.jsx";
import Library from "./roots/Library.jsx";
import Landing from "./roots/Landing.jsx";

import { AuthProvider } from "./components/AuthContext.jsx";

const router = createBrowserRouter([
	// {
	// 	path: "/",
	// 	element: <Landing />,
	// },
	{
		path: "/",
		element: <Discover />,
	},
	{
		path: "/Discover",
		element: <Discover />,
	},
	{
		path: "/Inbox",
		element: <Inbox />,
	},
	{
		path: "/Forum",
		element: <Forum/>,
	},
	{
		path: "/Library",
		element: <Library />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  	<React.StrictMode>
    	<AuthProvider location={location}>
			  <RouterProvider router={router} />
		  </AuthProvider>
  	</React.StrictMode>,
)