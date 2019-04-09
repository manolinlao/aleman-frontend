import React, { Component } from 'react';
import { Route, NavLink, HashRouter, BrowserRouter } from 'react-router-dom';
import { Grid,Row,Col } from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Login from './components/Login';
import Consulta from './components/Consulta';
import Busca from './components/Busca';
import Post from './components/Post';

import './App.css';

//hemos de definir la "región de routing" dentro del render del componente
//The creators of React Router have already thought:
// When you click on a link, a class value of active is automatically assigned to it.


/*
  For each link, pay attention to the URL we are telling our router to navigate to. 
  This URL value (defined by the to prop) acts as an identifier to ensure the right content gets loaded.
  The way we match the URL with the content is by using a Route component
*/

/*
  the Route component contains a path prop. 
  The value you specify for the path determines when this route is going to be active. 
  When a route is active, the component specified by the component prop gets rendered. 
  For example, when we click on the Stuff link (whose path is /stuff as set by the NavLink component's to prop),
  the route whose path value is also /stuff becomes active. 
  This means the contents of our Stuff component get rendered.
*/


/**Look and fell: clean and modern #24 https://visme.co/blog/website-color-schemes/ */


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="todo">
          <div className="cabecera">
            Meinen deutschen Wörter
          </div>
          <div className="menu">
            <div>
              <NavLink className="menuCol" exact to="/">Einloggen</NavLink>
              <NavLink className="menuCol"  to="/todas">Alle Wörter</NavLink>
              <NavLink className="menuCol"  to="/consulta">Wort finden</NavLink>
              <NavLink className="menuCol"  to="/post">Wort hochladen</NavLink>
            </div>
          </div>
          <div className="contenido">
            <Route exact path="/" component={Login}/>
            <Route path="/todas" component={Consulta}/>
            <Route path="/consulta" component={Busca}/>
            <Route path="/post" component={Post}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
