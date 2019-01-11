const React = require('react');
const ReactDOM = require('react-dom');
import MainContent from "./elements/MainContent";

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