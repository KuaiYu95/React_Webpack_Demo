import React, { Component } from 'react'
import './index.less'

function NavSide(props) {
  return <div className='nav-side'>
    <div className='nav-side-tip' onClick={() => console.log('联系我吗')}>联系我</div>
    <div className='money' onClick={() => console.log('联系我吗')}>
      打赏
      <div className='qcard'>
        <div className='alipay'>
          <img src='http://www.kuaiyu.site:81/photo/money/alipay.jpg' />
          <span>支付宝</span>
        </div>
        <div className='wxpay'>
          <img src='http://www.kuaiyu.site:81/photo/money/wxpay.jpg' />
          <span>微信</span>
        </div>
      </div>
    </div>
    <div className='to-top'><a href='#main'>TOP</a></div>
  </div>
}

export default NavSide