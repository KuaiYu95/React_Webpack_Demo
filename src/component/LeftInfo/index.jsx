import React from 'react'
import './index.less'


function LeftInfo(props) {
  const { leftNav, handleLeftNav } = props
  const navItems = [
    ['blog', '博客'],
    ['diary', '日记'],
    ['tour', '旅游'],
    ['plan', '计划'],
    ['collect', '收藏'],
  ]
  const style = { color: '#fff' }
  return (
    <div className='left-info'>
      <div className="line"></div>
      <div className='left-nav'>
        {navItems.map(nav => {
          return <div className='nav-item'
            key={nav[0]}
            style={nav[0] === leftNav ? style : {}}
            onClick={() => handleLeftNav(nav[0])}
          >
            {nav[1]}
          </div>
        })}
      </div>
    </div>
  )
}

export default LeftInfo