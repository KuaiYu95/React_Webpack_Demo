import React from 'react'
import Header from '@component/Header';
import NavSide from '@component/NavSide';
import Articals from '@pages/Articals';
import Footer from '@component/Footer';
import './index.less'

function HomePage(props) {

  return (
    <div className='project-warp'>
      <Header />
      <NavSide />
      <div className="main">
        <div className="content">
          <Articals />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage