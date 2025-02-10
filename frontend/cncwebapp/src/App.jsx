
// import { AppRouter } from './routes/AppRouter'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './app.scss'

import { Container } from 'react-bootstrap';
import { AppHeader } from './pages/AppLayout/components/AppHeader';
import { Outlet } from 'react-router-dom';
import { AppFooter } from './pages/AppLayout/components/AppFooter';
import { ToastContainer } from 'react-toastify';
import { AppLayout } from './pages/AppLayout/AppLayout';

function App()
{
  return (
    <AppLayout />
  )
}

export default App
