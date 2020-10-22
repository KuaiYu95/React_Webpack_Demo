import { hot } from 'react-hot-loader/root';
import React from 'react';
import Home from './pages/Home'

/*
 * function App() {
 *   return (
 *     <div>
 *       <Home />
 *     </div>
 *   )
 * }
 */

class App extends React.Component {
    render() {
        return <div><Home /></div>
    }
}

export default hot(App);
