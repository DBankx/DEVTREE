import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';
import WorkIcon from '@material-ui/icons/Work';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const Experience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    position: '',
    location: '',
    from: '',
    to: '',
    description: ''
  });

  const [current, setCurrent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const [disabled, setDisabeled] = useState(false);

  function click() {
    setDisabeled(!disabled);
  }

  const {
    title,
    company,
    position,
    location,
    from,
    to,
    description
  } = formData;

  return (
    <div className='next'>
      <Link to='/dashboard' className='mt-3'>
        <KeyboardBackspaceIcon /> Back to Dashboard
      </Link>
      <h2 className='mt-3'>
        <WorkIcon /> Add Experience
      </h2>
      <p className='mt-3'>Tell us where you have worked.</p>
      <small className='mt-3' style={{ color: 'rgb(202, 70, 70)' }}>
        * = required field
      </small>
      <div className='edit-form mt-3'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addExperience(formData, history);
          }}
        >
          <TextField
            className='mb-3'
            id='outlined-basic'
            name='title'
            label='* Job title'
            variant='outlined'
            type='text'
            value={title}
            onChange={handleChange}
          />
          <TextField
            className='mb-3'
            id='outlined-basic'
            name='company'
            label='* Company'
            variant='outlined'
            type='text'
            value={company}
            onChange={handleChange}
          />
          <TextField
            className='mb-3'
            id='outlined-basic'
            name='position'
            label='Position'
            variant='outlined'
            type='text'
            value={position}
            onChange={handleChange}
          />
          <TextField
            className='mb-3'
            id='outlined-basic'
            name='location'
            label='Location'
            variant='outlined'
            type='text'
            value={location}
            onChange={handleChange}
          />
          <div className='input-box mb-3'>
            <TextField
              id='outlined-basic'
              name='from'
              variant='outlined'
              type='date'
              value={from}
              onChange={handleChange}
            />
            <small>*Date you started the job</small>
          </div>
          <ul className='mt-3 checkbox'>
            <li>
              <Checkbox
                inputProps={{ 'aria-label': 'primary checkbox' }}
                value={current}
                onChange={() => {
                  setCurrent(!current);
                  click();
                }}
                checked={current}
              />
            </li>
            <li>Current Job?</li>
          </ul>

          <div className='input-box mb-3'>
            <TextField
              id='outlined-basic'
              name='to'
              variant='outlined'
              type='date'
              value={to}
              onChange={handleChange}
              disabled={disabled ? disabled : ''}
            />
            <small>Date you finished the Job</small>
          </div>

          <TextField
            id='outlined-multiline-static'
            label='Description'
            multiline
            rows={4}
            style={{ width: '82vw' }}
            name='description'
            variant='outlined'
            className='mb-3'
            value={description}
            onChange={handleChange}
          />

          <Zoom in={true}>
            <Fab
              className='mb-3'
              variant='extended'
              style={{
                display: 'block',
                padding: '0px 40px',
                backgroundColor: '#8c52ff',
                color: '#fff',
                outline: 'none'
              }}
              type='submit'
            >
              Submit
            </Fab>
          </Zoom>
        </form>
      </div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(Experience));
