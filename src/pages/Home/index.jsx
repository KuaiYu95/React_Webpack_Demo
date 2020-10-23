import React, { useState } from 'react'
import Header from '@component/Header';
import NavSide from '@component/NavSide';
import LeftInfo from '@component/LeftInfo';
import Footer from '@component/Footer';
import Articals from '@pages/Articals';
import BlogDetail from '@pages/BlogDetail';
import './index.less'

function HomePage(props) {

  const [leftNav, setLeftNav] = useState('blog')
  const [blogId, setBlogId] = useState('')

  const selectComponents = {
    'blog': <Articals handleDetail={blogId => setBlogId(blogId)} />,
    'diary': <div>无</div>,
    'tour': <div>无</div>,
    'plan': <div>无</div>,
    'collect': <div>无</div>,
  }

  const init = () => {
    setLeftNav('blog')
    setBlogId('')
  }
  
  return (
    <div className='project-warp' id='main'>
      <Header init={() => init()} />
      <NavSide />
      <div className="main">
        {!blogId ? <div className="content">
          <LeftInfo leftNav={leftNav} handleLeftNav={leftNav => setLeftNav(leftNav)} />
          <div className='body'>
            {selectComponents[leftNav]}
          </div>
        </div> : <div className='content'>
          <BlogDetail id={blogId} />
        </div>}
      </div>
      <Footer />
    </div>
  )
}

export default HomePage