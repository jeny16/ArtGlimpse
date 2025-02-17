import './App.css'
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './Components/index'
import { memo } from 'react';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default memo(App)
