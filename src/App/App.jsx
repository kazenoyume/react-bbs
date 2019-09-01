import React, { Component } from "react";
import logo from "./styles/logo.svg";
import "./styles/App.css";
import { Route, Switch, Link } from 'react-router-dom'
import Main from "../Main";
import {Cookies} from 'react-cookie';
import { AppContext } from "./context";
import PrivateRoute from '../PrivateRoute'
import { Menu } from 'antd'
import Login from '../Login'

export class App extends React.Component {
  state = {
    peopleCount: 0
  };

  render() {
    let { peopleCount } = this.state;
    return (
          <div>
          <Menu mode="horizontal">
            <Menu.Item>
              <Link to="/">Main</Link>
            </Menu.Item>
            <Menu.Item>
              {
                 (new Cookies().get('userID'))?(<Link to="/login">Logout </Link>):(<Link to="/login">Login </Link>)
              }
    
          </Menu.Item>
          </Menu>
          <Switch>
            <PrivateRoute path="/login" component={Login} />
            <PrivateRoute path="/" component={Main} />
          </Switch>
        </div>
    );
  }

  setPeopleCountChange = comment => {
    const set1 = new Set();
    comment.forEach(obj => {
      set1.add(obj.author);
    });
    this.setState({
      peopleCount: set1.size
    });
  };
}
