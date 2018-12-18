import {Navbar, NavItem} from 'react-materialize'
import {HashRouter, NavLink, Route} from "react-router-dom";
import Dishes from './Dishes';
import Products from './Products';
import User from './User';

const React = require('react');
const ReactDOM = require('react-dom');

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'User info'
    };
  }

  render() {
    return <HashRouter>
      <div>

        <Navbar className='red darken-1' brand={this.state.header} right>
          <li><NavLink onClick={() => this.setState({header: 'User info'})} to='/'>User info</NavLink></li>
          <li><NavLink onClick={() => this.setState({header: 'Products'})} to='/products'>Products</NavLink></li>
          <li><NavLink onClick={() => this.setState({header: 'Dishes'})} to='/dishes'>Dishes</NavLink></li>
          <NavItem href='/logout'>Logout</NavItem>
        </Navbar>

        <div className='container'>
          <Route exact path="/" component={User}/>
          <Route path="/user" component={User}/>
          <Route path="/products" component={Products}/>
          <Route path="/dishes" component={Dishes}/>
        </div>

      </div>
    </HashRouter>
  }
}

class Application extends React.Component {
  render() {
    return <div>
      <MainContent/>
    </div>
  }
}

ReactDOM.render(
    <Application name='alex'/>,
    document.getElementById('react')
);