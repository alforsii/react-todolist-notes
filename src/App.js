import React, { useState } from 'react';
import { Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import  TodoItems from './components/TodoItems'
import AddItemForm from './components/AddItemForm'

import './App.css';

function App() {
const [items,setItems] = useState([])

  return (
    <div className="App">
      <Navbar/>
      <div className='todo-list'>
        <Switch>
          <Route exact path ="/" render={props => <TodoItems {...props} items={items} setItems={setItems}/>}/>
          <Route exact path ="/notes/add-new" 
          render={props => <AddItemForm {...props} setItems={setItems} items={items} />}/>
          <Route exact path ="/notes/update" 
          render={props => <AddItemForm {...props} setItems={setItems} items={items} />}/>
          <Route exact path ="/notes/copy" 
          render={props => <AddItemForm {...props} setItems={setItems} items={items} />}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
