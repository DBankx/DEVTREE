import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { getProfile, updateProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const ProfileForm = ({
  getProfile,
  auth: { user },
  profile: { profile, loading },
  updateProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    status: '',
    company: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    website: '',
    youtube: '',
    twitter: '',
    instagram: '',
    facebook: 'facebook',
    linkedin: ''
  });

  useEffect(() => {
    async function profile() {
      await user;
      getProfile();
    }
    profile();
  }, [getProfile, loading, user]);

  const [toggle, setToggle] = useState(false);

  const {
    company,
    website,
    location,
    skills,
    status,
    bio,
    twitter,
    youtube,
    githubusername,
    linkedin,
    instagram,
    facebook
  } = formData;

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
    <Fragment>
      <div className='next'>
        <h2 className='mt-3'>
          <EditIcon /> Edit your profile
        </h2>
        <p className='mt-3'>Lets get some information from you!</p>
        <small className='mt-3' style={{ color: 'rgb(202, 70, 70)' }}>
          * = required field
        </small>
        <div className='edit-form mt-3'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile(formData, history, true);
            }}
          >
            <div className='input-box mb-3'>
              <FormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>
                  * Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={status}
                  onChange={handleChange}
                  label='status'
                  style={{ width: '82vw' }}
                  name='status'
                >
                  <MenuItem value={'Developer'}>Developer</MenuItem>
                  <MenuItem value='Web Developer'>Web Developer</MenuItem>
                  <MenuItem value='A.I Specialist'>A.I Specialist</MenuItem>
                  <MenuItem value='Data Scientist'>Data Scientist</MenuItem>
                  <MenuItem value='Front End Developer'>
                    Front End Developer
                  </MenuItem>
                  <MenuItem value='Back End Developer'>
                    Back End Developer
                  </MenuItem>
                  <MenuItem value='Full Stack Developer'>
                    Full Stack Developer
                  </MenuItem>
                  <MenuItem value='UI/UX Designer'>UI/UX Designer</MenuItem>
                  <MenuItem value='Mobile Applications Developer'>
                    Mobile Applications Developer
                  </MenuItem>
                  <MenuItem value='Game Developer'>Game Developer</MenuItem>
                  <MenuItem value='Cyber Security Specialist'>
                    Cyber Security Specialist
                  </MenuItem>
                </Select>
              </FormControl>
              <small>Give us an idea of your area of speciality</small>
            </div>

            <div className='input-box mb-3'>
              <TextField
                id='outlined-basic'
                name='company'
                label='Company'
                variant='outlined'
                type='text'
                value={company}
                onChange={handleChange}
              />
              <small>could be your company or a company you work for.</small>
            </div>

            <div className='input-box mb-3'>
              <TextField
                id='outlined-basic'
                name='website'
                label='Websiter URL'
                variant='outlined'
                type='text'
                value={website}
                onChange={handleChange}
              />
              <small>your web portfolio or personal website</small>
            </div>

            <div className='input-box mb-3'>
              <TextField
                id='outlined-basic'
                name='location'
                label='Location'
                variant='outlined'
                type='text'
                value={location}
                onChange={handleChange}
              />
              <small>city & state eg. Hamiltion, ON</small>
            </div>

            <div className='input-box mb-3'>
              <TextField
                id='outlined-basic'
                name='skills'
                label='*Skills'
                variant='outlined'
                type='text'
                value={skills}
                onChange={handleChange}
              />
              <small>please add a comma after each language.</small>
            </div>

            <div className='input-box mb-3'>
              <TextField
                id='outlined-basic'
                name='githubusername'
                label='Github Username'
                variant='outlined'
                type='text'
                value={githubusername}
                onChange={handleChange}
              />
              <small>Your github username to display repos</small>
            </div>

            <div className='input-box mb-3'>
              <TextField
                id='outlined-multiline-static'
                label='Bio'
                multiline
                rows={4}
                style={{ width: '82vw' }}
                name='bio'
                variant='outlined'
                value={bio}
                onChange={handleChange}
              />
              <small>A short bio of yourself.</small>
            </div>

            <ul className='btn-toggle mt-2'>
              <li>
                <Zoom in={true}>
                  <Fab variant='extended' onClick={() => setToggle(!toggle)}>
                    Add social media
                  </Fab>
                </Zoom>
              </li>
              <li>Optional</li>
            </ul>

            {toggle ? (
              <Fragment>
                {' '}
                <div className='mt-3 mb-3'>
                  <FormControl className='mb-4'>
                    <InputLabel htmlFor='input-with-icon-adornment'>
                      Twitter URL
                    </InputLabel>
                    <Input
                      id='input-with-icon-adornment'
                      startAdornment={
                        <InputAdornment position='start'>
                          <TwitterIcon />
                        </InputAdornment>
                      }
                      name='twitter'
                      value={twitter}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl className='mb-4'>
                    <InputLabel htmlFor='input-with-icon-adornment'>
                      Youtube URL
                    </InputLabel>
                    <Input
                      id='input-with-icon-adornment'
                      startAdornment={
                        <InputAdornment position='start'>
                          <YouTubeIcon />
                        </InputAdornment>
                      }
                      name='youtube'
                      value={youtube}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl className='mb-4'>
                    <InputLabel htmlFor='input-with-icon-adornment'>
                      Instagram URL
                    </InputLabel>
                    <Input
                      id='input-with-icon-adornment'
                      startAdornment={
                        <InputAdornment position='start'>
                          <InstagramIcon />
                        </InputAdornment>
                      }
                      name='instagram'
                      value={instagram}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl className='mb-4'>
                    <InputLabel htmlFor='input-with-icon-adornment'>
                      Facebook URL
                    </InputLabel>
                    <Input
                      id='input-with-icon-adornment'
                      startAdornment={
                        <InputAdornment position='start'>
                          <FacebookIcon />
                        </InputAdornment>
                      }
                      name='facebook'
                      value={facebook}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl className='mb-4'>
                    <InputLabel htmlFor='input-with-icon-adornment'>
                      Linkedin URL
                    </InputLabel>
                    <Input
                      id='input-with-icon-adornment'
                      startAdornment={
                        <InputAdornment position='start'>
                          <LinkedInIcon />
                        </InputAdornment>
                      }
                      name='linkedin'
                      value={linkedin}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
              </Fragment>
            ) : null}

            <Zoom in={true}>
              <Fab
                style={{
                  backgroundColor: '#8c52ff',
                  color: '#fff',
                  outline: 'none',
                  display: 'block',
                  padding: '8px 40px'
                }}
                variant='extended'
                type='submit'
                className='mb-3'
              >
                SUBMIT
              </Fab>
            </Zoom>
          </form>
        </div>
        <Link to='/dashboard' className='mt-3'>
          <KeyboardBackspaceIcon /> Back to Dashboard
        </Link>
      </div>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapState = (state) => ({
  auth: state.auth,
  profile: state.profile,
  updateProfile: PropTypes.func.isRequired
});

export default connect(mapState, { getProfile, updateProfile })(
  withRouter(ProfileForm)
);
