import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Header from "../Header";
import ZoneResource from "../ZoneResource";


function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <div className="container">
        <ZoneResource/>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
