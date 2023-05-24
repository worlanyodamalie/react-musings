import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskApp from './tasks/TaskManager'
import { CountriesDebounce , Dashboard } from './musings/index'

const router = createBrowserRouter([{
  path: "/",
  element: <App/>
},
{
  path: '/tasks',
  element: <TaskApp />
},
{
  path: '/musings',
  element: <Dashboard />
}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
