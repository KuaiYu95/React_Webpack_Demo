import React, { Component } from 'react'
import './index.less'

function NavSide(props) {
  return <div className='nav-side'>
    <div className='nav-side-tip' onClick={() => console.log('联系我吗')}>联系我吗</div>
  </div>
}

export default NavSide