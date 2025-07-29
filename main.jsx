import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
import UserList from './components/UserList.jsx'
import TodoList from './components/TodoList.jsx'
import PostList from './components/PostList.jsx'
import Post from './components/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'users', element: <UserList /> },
      { path: 'todos', element: <TodoList /> },
      { path: 'posts', element: <PostList /> }
    ]
  },
  {
    path: '/posts/:postId',
    element: <Post />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
