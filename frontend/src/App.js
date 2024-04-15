import './App.css';
import React from 'react'
import { Fragment } from 'react';
import Router from './Components/Router/Router';//Sale como error pero está bien así (me hizo sufrir mucho esto)

// Es la importación del router
function App() {
  return (
    <Fragment>
      <Router /> 
    </Fragment>
  );
}

export default App;
