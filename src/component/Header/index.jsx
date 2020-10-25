import React, { Component } from 'react'
import util from '@utils/util';
import './index.less'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adverb: util.currentTime()
    }
  }

  componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({ adverb: util.currentTime() })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeId)
  }

  render() {
    const { adverb } = this.state
    return (
      <div className='header'>
        <div className='time-line'>
          <div className='time'>{adverb}</div>
          <div>hello world</div>
          <div className='header-nav'>
            <span onClick={() => this.props.init()}>首页</span>
            <span onClick={() => util.showToast('没有权限！')}>上传</span>
            <a title='KuaiYu95' href="https://github.com/KuaiYu95">Github</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header