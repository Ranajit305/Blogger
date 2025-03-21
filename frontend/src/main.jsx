import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CommentContextProvider } from './utils/Comment.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CommentContextProvider>
      <Toaster toastOptions={{ duration: 2000 }} />
      <App />
    </CommentContextProvider>
  </BrowserRouter>,
)