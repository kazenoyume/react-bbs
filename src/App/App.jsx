import React, { Component } from 'react';
import { Input } from 'antd';

import logo from './logo.svg';
import './App.css';


import { Main } from '../Main';
import { AppContext } from './context'

const { TextArea } = Input;

export class App extends Component {
    state = {
      peopleCount: 0,

    }
    
    render() {

      let { peopleCount} = this.state;
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <span>{peopleCount}人</span>
            </div>
            <div className="App-body">
            <AppContext.Provider
              value={{
                peopleCount: 1234,
                onPeopleCountChange: this.setPeopleCountChange,
                test:44444444444

                
              }}
            >
              <Main >
              </Main>
            </AppContext.Provider>
            </div>
         
             
          </div>
        );
        
    }
    setPeopleCountChange = comment => {
      const set1 = new Set();
      comment.forEach(obj=>{ 
            set1.add(obj.author)
        });
      this.setState({
        peopleCount:set1.size
      });
    }
}

