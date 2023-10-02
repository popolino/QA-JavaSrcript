import React from 'react';
import './assets/scss/reset.scss'
import './assets/scss/global.scss'
import Navigation from './features/Navigation/Navigation';
import Main from "./features/Main/Main";
import './App.scss'


function App() {
  return (
    <div className='container'>
     <Navigation/>
     <Main/>
    </div>
  );
}

export default App;
