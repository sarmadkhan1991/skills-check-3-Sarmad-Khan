import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Components/Dashboard/dashboard';

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      user: {},
      username: '',
      password: ''
    }
    this.updateUser = this.updateUser.bind(this);
  }

  login() {
    const { username, password } = this.state;
    axios.post('/auth/login', {username, password}).then(res => {
      this.setState({
        user: res.data,
        username: '',
        password: ''
      })
    })
    .catch(err => {
      this.setState({
        user: {},
        username: '',
        password: ''
      })
      console.log(err);
    });
  }

  register () {
    const { username, password } = this.state;
    axios.post('/auth/register', {username, password}).then(res => {
      this.setState({
        user: res.data,
        username: '',
        password: ''
      })
    })
    .catch(err => {
      this.setState({
        user: {},
        username: '',
        password: ''
      })
      console.log(err);
    })
  }

  updateUser(user){
    this.setState({
      user: user
    })
  }

  handleUserNameInput(value) {
    this.setState({
      username: value
    });
  }

  handlePasswordInput(value) {
    this.setState({
      password: value
    })
  }

  render(){
    const {user} = this.state;
    if (user.username){
      return <div>
        <Dashboard updateUser={this.updateUser}/>
      </div>
    } else {
      const { username, password } = this.state;
      return (
        <div className="App">
          <div>Houser Logo</div>
          <div>Username
            <div className='login-form'>
              <input type='text' 
                     name='username' 
                     value={username}
                     onChange={e => this.handleUserNameInput(e.target.value)}/>
            </div>
          </div>
          <div>Password
            <div>
              <input type='password' 
                     name='password' 
                     value={password}
                     onChange={e => this.handlePasswordInput(e.target.value)}/>
            </div>
            <div>
            <button onClick={() => this.login()}>Log In</button>
              <button onClick={() => this.register()} id="reg">
                Register
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
