import './App.css'
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './Components/index'
import { memo } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // <>
    //   <Header />
    //   <Outlet />
    //   <Footer />
    // </>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Outlet />
        <ToastContainer position='top-right' />
      </Box>
      <Footer />
    </Box>

  )
}

export default memo(App)
