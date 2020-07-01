import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import devtree from '../../img/devtree.png';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

// Login Page
const Login = ({ login, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  function handleFormData(e) {
    const { name, value } = e.target;

    setFormData((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  }

  // checks if user is logged in..if true redirect to the dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='register-body'>
        <div className='register-box'>
          <div className='auth-form'>
            <img src={devtree} alt='' />
            <p className='p2 mt-1'>
              Already have an account with us?{' '}
              <Link to='/register'>Register</Link>
              <LockOpenRoundedIcon style={{ fontSize: '15px' }} />
            </p>
            <form
              className='mt-5'
              onSubmit={(e) => {
                e.preventDefault();
                login({ username: username, password: password });
              }}
            >
              <FormControl className='mb-4'>
                <InputLabel htmlFor='input-with-icon-adornment'>
                  Username
                </InputLabel>
                <Input
                  id='input-with-icon-adornment'
                  startAdornment={
                    <InputAdornment position='start'>
                      <PersonIcon />
                    </InputAdornment>
                  }
                  value={username}
                  name='username'
                  onChange={handleFormData}
                />
              </FormControl>

              <FormControl className='mb-4'>
                <InputLabel htmlFor='input-with-icon-adornment'>
                  Password
                </InputLabel>
                <Input
                  id='input-with-icon-adornment'
                  startAdornment={
                    <InputAdornment position='start'>
                      <VpnKeyIcon />
                    </InputAdornment>
                  }
                  value={password}
                  name='password'
                  onChange={handleFormData}
                  type='password'
                />
              </FormControl>

              <Zoom in={true}>
                <Fab type='submit' variant='extended'>
                  Login
                </Fab>
              </Zoom>
            </form>
          </div>

          <div className='auth-img'></div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

// gets the state from the redux store
const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { login })(Login);
