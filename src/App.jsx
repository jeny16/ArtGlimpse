import './App.css'
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './Components/index'
import { memo } from 'react';
import { Box } from '@mui/material';

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
      </Box>
      <Footer />
    </Box>

  )
}

export default memo(App)
