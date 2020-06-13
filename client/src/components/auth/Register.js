import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import devtree from '../../img/devtree.png';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    username: '',
    email: '',
    password: ''
  });

  const { name, date, username, email, password } = formData;

  function handleFormData(e) {
    const { name, value } = e.target;

    setFormData((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  }

  return (
    <Fragment>
      <div className='register-body'>
        <div className='register-box'>
          <div className='auth-form'>
            <img src={devtree} alt='' />
            <p className='p2 mt-1'>
              Already have an account with us? <Link to='/login'>login</Link>
              <LockOpenRoundedIcon style={{ fontSize: '15px' }} />
            </p>
            <form
              className='mt-3'
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Done');
              }}
            >
              <TextField
                name='name'
                label='Name'
                type='text'
                value={name}
                onChange={handleFormData}
              />
              <TextField
                name='username'
                label='Username'
                type='text'
                value={username}
                onChange={handleFormData}
              />
              <TextField
                label='email'
                type='text'
                name='email'
                value={email}
                onChange={handleFormData}
              />
              <TextField
                label='Birthday'
                type='date'
                name='date'
                InputLabelProps={{
                  shrink: true
                }}
                value={date}
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
                  Register
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

Register.propTypes = {};

export default Register;
