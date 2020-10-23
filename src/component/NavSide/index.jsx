import React, { Component } from 'react'
import './index.less'

function NavSide(props) {
  return <div className='nav-side'>
    <div className='nav-side-tip' onClick={() => console.log('联系我吗')}>联系我</div>
    <div className='to-top' ><a href='#main'>TOP</a></div>
  </div>
}

export default NavSide