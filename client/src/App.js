import React, { Component } from 'react';
import AddFoodForm from './components/AddFoodForm';
import Header from './components/Header';
import AllFoods from './components/AllFoods';
import {
  BrowserRouter, //possibly switch to hashrouter after deployment if issues arise
  Route
} from 'react-router-dom';
import EditFoodForm from './components/EditFoodForm';
class App extends Component {
  state = {
    foods: []
  }
  componentDidMount(){
    fetch('/all')
    .then(res => res.json())
    .then(res => this.setState({foods:res}));
  }
  //to keep page in sync with server we have to update the food in the state or run a new fetch
  editFoodState(id, food){
    let newState = [];
    for(let i = 0; i < this.state.foods.length; i++){
      newState.push(this.state.foods[i]);
      if (newState[i].id === parseInt(id)){
        newState[i] = food;
      }
    }
    this.setState({
      foods: newState
    });
  }
  //to keep page in sync with server we have to add the food in the state or run a new fetch
  addFoodToState(food){
    let newState = [];
    for(let i = 0; i < this.state.foods.length; i++){
      if(this.state.foods[i] !== null){
        newState.push(this.state.foods[i]);
      }
    }
    newState.push(food);
    this.setState({
      foods: newState
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/foods" render={() => <AllFoods foods={this.state.foods} />} />
          <Route path="/add" render={({history}) => <AddFoodForm addFoodToState={this.addFoodToState.bind(this)} history={history} />} />
          <Route path="/edit/:id" render={({match,history}) => <EditFoodForm editFoodState={this.editFoodState.bind(this)} match={match} history={history} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
