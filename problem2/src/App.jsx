import { useState } from 'react'
import './App.css'
import SwapForm from './components/SwapForm'

const App = () => {
  return (
      <div class='container'>
          <h1 class="title">Currency Swap</h1>
          <div class='item'>
              <SwapForm />
          </div>
      </div>
  );
};

export default App
