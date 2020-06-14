import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import devtree from '../../img/devtree.png';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
              <TextField
                name='username'
                label='Username'
                type='text'
                value={username}
                onChange={handleFormData}
              />
              <TextField
                type='text'
                label='password'
                type='password'
                name='password'
                value={password}
                onChange={handleFormData}
              />
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

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { login })(Login);
