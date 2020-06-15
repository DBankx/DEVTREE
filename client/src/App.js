import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import { Provider } from 'react-redux';
import SetAlert from './components/auth/Alert';
import { loadUser } from './actions/auth';
import Navbar2 from './components/layout/Navbar2';
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  // load the user from the backend immideatly
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Navbar2 />
          <main>
            <SetAlert />
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <div className='next'>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </div>
            </Switch>
          </main>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
