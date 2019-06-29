import React, { Component } from 'react';
import { Input } from 'antd';

import logo from './logo.svg';
import './App.css';


import { Main } from '../Main';


const { TextArea } = Input;

export class App extends Component {
    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="App-body">
            <Main >
            </Main>
            </div>
          </div>
        );
    }
}

