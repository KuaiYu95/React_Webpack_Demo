import React, { Component } from 'react'
import Header from '@component/Header';
import NavSide from '@component/NavSide';
import Footer from '@component/Footer';
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
    return (
      <div className='project-warp'>
        <Header />
        <NavSide />
        <div className="body"></div>
        <Footer />
      </div>
    )
  }
}

export default HomePage