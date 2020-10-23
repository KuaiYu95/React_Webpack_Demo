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
          <div>您好：{adverb}</div>
          <div className='header-nav'>
            <span>首页</span>
            <span>上传</span>
            <span title='KuaiYu95'>Github</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header