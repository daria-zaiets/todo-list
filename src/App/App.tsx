import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1> TODO LIST</h1>
      </header>
      <main className="app-body">
          <div className="app-body__add-container">
              <TextField className='app-body__todo-input' label='todo' variant='outlined' size='small'/>
              <Button className='app-body__todo-add-btn' variant="contained" size='small'> Add </Button>
          </div>
      </main>
    </div>
  );
}

export default App;
