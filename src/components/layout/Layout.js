import React from 'react'
import Header from '../Home/Header/Header'
import HeaderBottom from '../Home/Header/HeaderBottom'
import Footer from '../Home/footer/Footer'
const Layout = ({children}) => {
  return (
    <div>

        <Header />
        <HeaderBottom />
        {children}
        <Footer />
    </div>
  )
}

export default Layout