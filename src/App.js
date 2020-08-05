import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Board from './pages/Board'
import { AppContext } from './context/AppContext'
import './App.css'
import Register from './pages/Register';


function App() {
  
  const { user } = useContext(AppContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {
            user &&
            <Route path="/board" component={Board} />
          }
          <Route path="/" component={Login} />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
