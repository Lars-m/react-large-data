import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppClient from './AppClientPagination'
import AppRemote from './AppRemote'
import * as serviceWorker from './serviceWorker';

class Selector extends React.Component {
  state = { app: <App /> }
  select = (evt) => {
    const app = evt.target.id;
    switch (app) {
      case "a2": this.setState({ app: <AppClient /> }); break;
      //Change the line below to import AppRemote, once you get to that
      case "a3": this.setState({ app: <AppRemote /> }); break;
      default: this.setState({ app: <App /> })
    }
  }
  render() {
    return (
    <div>
      <div onClick={this.select} >
        <a href="/#" id="a1"> Render All </a> &nbsp;
        <a href="/#" id="a2">Paginate on Client</a> &nbsp;
        <a href="/#" id="a3">Paginate on Server</a> &nbsp;
      </div>
      {this.state.app}
    </div>
    )}
 }
 


ReactDOM.render(<Selector />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
