import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {names: [], msg:""}
 async componentDidMount(){
   console.time("fetching");
   this.setState({msg:"Loading..."});
   const names = await fetch("http://localhost:1234/api").then(res=>res.json());
   console.timeEnd("fetching");
   console.time("rendering");
   this.setState({names,msg:""});
 }
 componentDidUpdate(){
   console.timeEnd("rendering");
 }
 render(){
   const listItems = this.state.names.map(n=>(
     <li key={n.id}>{n.firstName}, {n.lastName}</li>
   ));
   return <div>
   <h2>Rendering ALL</h2>
     {this.state.msg}
     <ul>
     {listItems}
     </ul>
   </div>
 }

}

export default App;
