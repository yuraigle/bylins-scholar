import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from "../Header";
import ZoneResource from "../ZoneResource";

import '../../util/IconsLibrary';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Switch>
            <Route path="/zones" component={ZoneResource}/>
            <Route path="/characters" render={() => <span>characters</span>}/>
            <Route path="/reagents" render={() => <span>reagents</span>}/>
          </Switch>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
}

export default App;
