import React, { Component } from 'react'
import dayjs from 'dayjs';
import './index.less'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adverb: dayjs().format('YYYY-MM-DD hh:mm:ss')
    }
  }

  componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({ adverb: dayjs().format('YYYY-MM-DD HH:mm:ss') })
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
          <div>hello world</div>
        </div>
      </div>
    )
  }
}

export default Header