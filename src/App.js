import { hot } from 'react-hot-loader/root';
import React from 'react';
import Home from './pages/Home'

class App extends React.Component {
  render() {
    return (
      <div className='project'>
        <Home />
      </div>
    )
  }
}

export default hot(App);
