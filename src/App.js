import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Board from './pages/Board'
import { AppContext } from './context/AppContext'
import './App.css'


function App() {
  
  const { isLogged } = useContext(AppContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/board" component={Board} />
          <Route path="/" component={Login} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
