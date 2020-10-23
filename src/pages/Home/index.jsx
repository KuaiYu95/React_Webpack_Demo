import React, { Component } from 'react'
import Header from '@component/Header';
import { Button } from 'antd';
import './index.less'

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentWillUnmount() {

  }

  handleClick() {
    console.log('hello world')
  }

  handleClick2 = () => {
    console.log('hello world')
  }

  render() {
    const { adverb } = this.state
    return (
      <div className='project-warp'>
        <Header />
        <Button onClick={this.handleClick}>hello world</Button>
        <Button onClick={() => this.handleClick2()}>hello world</Button>
      </div>
    )
  }
}

export default HomePage