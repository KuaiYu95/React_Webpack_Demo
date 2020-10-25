import React from 'react'
import './index.less'

function NavSide(props) {
  return <div className='nav-side'>
    <div className='nav-side-tip'>
      联系我
      <div className='personalInfo'>
        <div className="wx" title='mywx_ky'>微信 mywx_ky</div>
        <div className="qzoon" title='ky.kyy@qq.com'>
          <a href="mailto:ky.kyy@qq.com">邮箱 ky.kyy@qq.com</a>
        </div>
        <div className="github" title='https://github.com/KuaiYu95'>
          <a href="https://github.com/KuaiYu95">Github KuaiYu95</a>
        </div>
      </div>
    </div>
    <div className='money'>
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