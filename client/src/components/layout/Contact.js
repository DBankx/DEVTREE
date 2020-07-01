import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import emailIcon from '../../img/email.png';
import { sendEmail } from '../../actions/auth';
import { connect } from 'react-redux';
import callIcon from '../../img/call-icon.png';

const Contact = ({ sendEmail }) => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const { email, subject, message } = formData;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div className='next'>
      <div className='contact-page'>
        <div className='contact-section'>
          <h2>Had a problem while using devtree?</h2>
          <ul>
            <li>
              <img src={emailIcon} alt='email icon' style={{ width: '35px' }} />{' '}
              Email us: <strong>loldondo@gmail.com</strong>
            </li>
            <li>or</li>
            <li>
              <img src={callIcon} alt='call icon' />
              Call us: <strong>09947358494</strong>
            </li>
          </ul>
          <div className='contact-form'>
            <h5>Witnessed a bug? or having something else to tell us asap? </h5>
            <form
              onSubmit={(e) => {
                sendEmail(formData);
                setFormData({
                  email: '',
                  subject: '',
                  message: ''
                });
                e.preventDefault();
              }}
            >
              <div className='form-inputs'>
                <div className='input-box mb-3'>
                  <TextField
                    id='outlined-basic'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    variant='outlined'
                    type='text'
                    style={{ width: '87vw' }}
                  />
                  <small>Your email</small>
                </div>

                <div className='input-box mb-3'>
                  <FormControl variant='outlined'>
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Reason
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Reason'
                      style={{ width: '87vw' }}
                      name='subject'
                      value={subject}
                      onChange={handleChange}
                    >
                      <MenuItem value='Found a Bug'>Found a bug</MenuItem>
                      <MenuItem value='Code comment'>Code comment</MenuItem>
                      <MenuItem value='Critisism'>Critisism</MenuItem>
                      <MenuItem value='Collab'>Collab</MenuItem>
                      <MenuItem value='other'>other</MenuItem>
                    </Select>
                  </FormControl>
                  <small>Tell us your reason for contacting us</small>
                </div>

                <div className='input-box mb-3'>
                  <TextField
                    id='outlined-multiline-static'
                    label='Message'
                    multiline
                    rows={4}
                    style={{ width: '87vw' }}
                    name='message'
                    variant='outlined'
                    value={message}
                    onChange={handleChange}
                  />
                  <small>Your message</small>
                </div>

                <Zoom in={true}>
                  <Fab variant='extended' type='submit'>
                    Submit
                  </Fab>
                </Zoom>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { sendEmail })(Contact);
