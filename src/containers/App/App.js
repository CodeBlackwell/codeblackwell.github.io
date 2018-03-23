import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import { Background } from './App.style';
import NavigationBar from '../../components/Navigation/Navigation';
import ReallySmoothScroll from 'really-smooth-scroll';


ReallySmoothScroll.shim();
//Scroll to top of page on route change
hashHistory.listen(() => window.scrollTo(0, 0));

class App extends Component {
  render() {
    return (
      <div>
          <Background/>
          <NavigationBar/>
          { this.props.children }
      </div>
    );
  }
}

export default App;
