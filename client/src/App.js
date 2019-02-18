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

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/foods" render={() => <AllFoods foods={this.state.foods} />} />
          <Route path="/add" component={AddFoodForm} />
          <Route path="/edit/:id" component={EditFoodForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
