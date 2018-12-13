const React = require('react');
const ReactDOM = require('react-dom');
import {Footer, Navbar, NavItem} from 'react-materialize'

class MainContent extends React.Component {
  render() {
    return <div>
      <Navbar brand='PP' right>
        <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
        <NavItem href='#user'>User info</NavItem>
        <NavItem href='#products'>Products</NavItem>
        <NavItem href='#dishes'>Dishes</NavItem>
        <NavItem href='#dishes'>Logout</NavItem>
      </Navbar>
      <div className='container indigo lighten-2'>
        content
        <br/>

        <br/>
        ggg
        <br/>

        <br/>


        very big content

      </div>
      <Footer copyrights="2018 Copyright Text">
        <h5 className="white-text">Site about PP</h5>
      </Footer>
    </div>
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