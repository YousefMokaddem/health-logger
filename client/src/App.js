import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import CreateFood from './components/CreateFood';
import Header from './components/Header';
import Foods from './components/Foods';
import NotFound from './components/NotFound';
import UpdateFood from './components/UpdateFood';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateDay from './components/CreateDay';
import Days from './components/Days';
import AddFood from './components/AddFood';


class App extends Component {
  state = {
    user: undefined,
    day: undefined
  }
  mounted = false;
  componentDidMount(){
    this.mounted = true;
    if(JSON.parse(localStorage.getItem('user'))){
      this.setState({
        user: { 
          ...JSON.parse(localStorage.getItem('user')),
          headers: JSON.parse(localStorage.getItem('headers'))
        }
      });
    }else{
      this.setState({user:null});
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  signOut(){
    this.setState({
      user: null
    }, () => {
      localStorage.setItem('user',null);
      localStorage.setItem('headers',null);
    });
  }

  //store user in state after sign in
  setUser(email, headers, id){
    this.setState({
      user:{
        email,headers,id
      }
    }, () => { //set local storage user
      localStorage.setItem('user', JSON.stringify(this.state.user));
      let storedHeaders = [];
      storedHeaders.push(["authorization", headers.get('Authorization')]);
      storedHeaders.push(["content-type", headers.get('Content-Type')]);
      localStorage.setItem('headers', JSON.stringify(storedHeaders));
    });
  }
  //add day to state after selected
  selectDay(day){
      this.setState({day:{...day}});
  }

  render() {
    if(!this.mounted)return(<div></div>);
    return (
      <BrowserRouter>
        <div>
          <Header signOut={this.signOut.bind(this)} day={this.state.day} user={this.state.user}/>
          <Switch >
            {/* display login screen if not logged in and user info if logged in. */}
            <Route exact path="/" render={() => this.state.user? <div></div> : <SignIn setUser={this.setUser.bind(this)}/>} />
            <Route path="/signup" render={() => <SignUp />} />
            <PrivateRoute user={this.state.user} path="/foods/create" component={({history}) => <CreateFood user={this.state.user} history={history} />} />
            <PrivateRoute user={this.state.user} path="/foods" component={() => <Foods user={this.state.user} day={this.state.day} foods={this.state.foods} />} />
            <PrivateRoute user={this.state.user} path="/edit/:id" component={({match,history}) => <UpdateFood user={this.state.user} match={match} history={history} />} />
            <PrivateRoute user={this.state.user} path="/days/create" component={() => <CreateDay user={this.state.user} />}/>
            <PrivateRoute user={this.state.user} path="/days/addfood/:id" component={(props) => <AddFood renderProps={props} day={this.state.day} user={this.state.user} />}/>
            <PrivateRoute user={this.state.user} path="/days" component={() => <Days day={this.state.day} selectDay={this.selectDay.bind(this)} user={this.state.user} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
