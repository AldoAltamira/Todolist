import React, { Component } from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    todolist: [],
    filterTodolist: [],
    add: '',
  }

  addClick = () => {
    let {add, todolist} = this.state;
    todolist.push(add);
    add = '';
    this.setState({add, todolist}, () => this.filterData());
  };

  deleteItem = index => {
    let {todolist} = this.state;
    todolist.splice(index, 1);
    this.setState({todolist}, () => this.filterData());
  };

  filterData = search => {
    let {todolist} = this.state;
    let filterTodolist = [];
    if (search) {
      todolist.map((e, index) => {
        if (e.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          filterTodolist.push({
            label: e,
            index: index
          });
        }
        return e;
      });
    } else {
      filterTodolist = todolist.map((e, index) => {
        return {
          label: e,
          index: index
        };
      });
    }
    this.setState({filterTodolist});
  }

  render() {
    let {add, filterTodolist, todolist} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
        <FormControl>
          <InputLabel htmlFor="inputAdd">Add</InputLabel>
          <Input
            id="inputAdd"
            value={add}
            onChange={(event) => {this.setState({add: event.target.value})}}
          />
          <Button variant="contained" onClick={() => this.addClick()}>Add</Button>
        </FormControl>
        </div>
        <div>
          {todolist.length > 0 ? <FormControl>
            <InputLabel htmlFor="inputSearch">Search</InputLabel>
            <Input
              id="inputSearch"
              onChange={(event) => {this.filterData(event.target.value);}}
            />
          </FormControl> : <></>}
          {filterTodolist.map((e, index) => (
            <div>
              <p key={index}>{e.label}</p>
              <Button variant="contained" onClick={() => this.deleteItem(e.index)}>Delete</Button>
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}

export default App;
