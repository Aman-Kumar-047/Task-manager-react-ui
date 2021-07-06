import React, {lazy, Suspense, useState} from 'react';
import './App.css';

// import {useLocation} from 'react-router-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';




// import of components
// import Layout from './hoc/Layout/Layout';
import Loader from './components/Loader/Loader';

// import AttributesList from './containers/DataTabele/DataTable';

const LogIn = lazy(() => import('./pages/Login/LogIn'));
const TaskManager = lazy(() => import('./pages/TaskManager/TaskManager'));


function App() {
    let [isLoggedIn,setIsLoggedIn] = useState("");

    let tokenExists = false;
    if (typeof Storage !== "undefined") {
        tokenExists = localStorage.getItem("token") && localStorage.getItem("token").length > 0 ? true :false;
    }
    console.log("is token", tokenExists);


    return (
        <div className="App">
                <Suspense fallback={<Loader/>}>
                  <BrowserRouter>
                  {
                      tokenExists ?
                      <Switch>
                      <Route exact path={"/"} component={() => <TaskManager loggedOut={() => {setIsLoggedIn(false)}}/>}/>
                      <Route path={"/task-manager"} component={() => <TaskManager loggedOut={() => {setIsLoggedIn(false)}}/>}/>
                        </Switch> :
                        <Switch>
                        <Route path={"/login"} component={() => <LogIn loggedIn={() => {setIsLoggedIn(true)}}/>}/>
                        <Route exact path={"/"} component={() => <LogIn loggedIn={() => {setIsLoggedIn(true)}} />}/>
                    </Switch>
                  }
                </BrowserRouter>
                </Suspense>
        </div>
    );
}

export default App;
