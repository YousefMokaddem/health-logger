import React, { Component } from 'react';
import AddFoodForm from './components/AddFoodForm';
class App extends Component {
  state = {
    food: []
  }
  componentDidMount(){
    fetch('/all')
    .then(res => res.json())
    .then(res => this.setState({food:res}));
  }
  render() {
    return (
      <div className="App">
      <AddFoodForm />
      </div>
    );
  }
}

export default App;
