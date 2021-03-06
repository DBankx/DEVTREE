import React, { Fragment, useEffect, Suspense } from 'react';
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
import ProfileForm from './components/profile-forms/ProfileForm';
import Experience from './components/profile-forms/Experience';
import Education from './components/profile-forms/Education';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Spinner from './components/layout/Spinner';
import FollowingPage from './components/profile/FollowingPage';
import Contact from './components/layout/Contact';

function App() {
  // load the user from the backend immideatly
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
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
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/contact' component={Contact} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={ProfileForm}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={Experience}
              />
              <PrivateRoute exact path='/add-education' component={Education} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <Route exact path='/developers' component={Profiles} />

              <Route exact path='/profile/:id' component={Profile} />

              <PrivateRoute exact path='/feed' component={Posts} />

              <PrivateRoute exact path='/post/:id' component={Post} />
              <PrivateRoute
                exact
                path='/following&followers/:id'
                component={FollowingPage}
              />
            </Switch>
          </main>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
