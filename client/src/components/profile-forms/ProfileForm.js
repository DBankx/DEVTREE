import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CodeIcon from '@material-ui/icons/Code';
import GitHubIcon from '@material-ui/icons/GitHub';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import profileImage from '../../img/profile-form.png';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { getProfile, updateProfile } from '../../actions/profile';
import { connect } from 'react-redux';

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

    // check if there is any data on the field then display
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      status: loading || !profile.status ? '' : profile.status,
      bio: loading || !profile.bio ? '' : profile.bio,
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      instagram: loading || !profile.instagram ? '' : profile.instagram,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      linkedin: loading || !profile.linkedin ? '' : profile.linkedin
    });
  }, [getProfile, loading]);

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
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label
                    className='input-group-text'
                    htmlFor='inputGroupSelect01'
                  >
                    status
                  </label>
                </div>
                <select
                  name='status'
                  className='custom-select'
                  id='inputGroupSelect01'
                  value={status}
                  onChange={handleChange}
                >
                  <option value='0'>* select area of expertise</option>
                  <option value='Developer'>Developer</option>
                  <option value='Web Developer'>Web Developer</option>
                  <option value='A.I Specialist'>A.I Specialist</option>
                  <option value='Front End Developer'>
                    Front End Developer
                  </option>
                  <option value='Back End Developer'>Back End Developer</option>
                  <option value='UI/UX Designer'>UI/UX Designer</option>
                  <option value='Data Scientist'>Data Scientist</option>
                  <option value='Desktop App Developer'>
                    Desktop App Developer
                  </option>
                  <option value='Mobile App Developer'>
                    Mobile App Developer
                  </option>
                  <option value='Full Stack Developer'>
                    Full Stack Developer
                  </option>
                </select>
              </div>
              <small>Gives us an idea of your specailzed</small>
            </div>

            <div className='input-box mb-3'>
              <div className='input-group flex-nowrap '>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='addon-wrapping'>
                    <BusinessIcon />
                  </span>
                  <input
                    type='text'
                    name='company'
                    className='form-control'
                    placeholder='company'
                    aria-label='Username'
                    aria-describedby='addon-wrapping'
                    value={company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <small>could be your company or a company you work for.</small>
            </div>

            <div className='input-box mb-3'>
              <div className='input-group flex-nowrap '>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <LanguageIcon />
                  </span>
                  <input
                    type='text'
                    name='website'
                    className='form-control'
                    placeholder='website'
                    aria-label='Username'
                    aria-describedby='addon-wrapping'
                    value={website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <small>your web portfolio or personal website</small>
            </div>

            <div className='input-box mb-3'>
              <div className='input-group flex-nowrap'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='addon-wrapping'>
                    <LocationOnIcon />
                  </span>
                  <input
                    type='text'
                    name='location'
                    className='form-control'
                    placeholder='Location'
                    aria-label='Username'
                    aria-describedby='addon-wrapping'
                    value={location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <small>city & state eg. Hamiltion, ON</small>
            </div>

            <div className='input-box mb-3'>
              <div className='input-group flex-nowrap '>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='addon-wrapping'>
                    <CodeIcon />
                  </span>
                  <input
                    type='text'
                    name='skills'
                    className='form-control'
                    placeholder='* Skills'
                    aria-label='Username'
                    aria-describedby='addon-wrapping'
                    value={skills}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <small>please add a comma after each language.</small>
            </div>

            <div className='input-box mb-3'>
              <div className='input-group flex-nowrap '>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='addon-wrapping'>
                    <GitHubIcon />
                  </span>
                  <input
                    type='text'
                    name='githubusername'
                    className='form-control'
                    placeholder='Github username'
                    aria-label='Username'
                    aria-describedby='addon-wrapping'
                    value={githubusername}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <small>Your github username to display repos</small>
            </div>

            <div className='input-box mb-3'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <FingerprintIcon />
                  </span>
                </div>
                <textarea
                  name='bio'
                  className='form-control'
                  aria-label='With textarea'
                  value={bio}
                  onChange={handleChange}
                ></textarea>
              </div>
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
                <div className='input-box mb-3'>
                  <div className='input-group flex-nowrap '>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='addon-wrapping'>
                        <YouTubeIcon />
                      </span>
                      <input
                        type='text'
                        name='youtube'
                        className='form-control'
                        placeholder='Youtube URL'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                        value={youtube}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='input-box mb-3'>
                  <div className='input-group flex-nowrap '>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='addon-wrapping'>
                        <TwitterIcon />
                      </span>
                      <input
                        type='text'
                        name='twitter'
                        className='form-control'
                        placeholder='Twitter URL'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                        value={twitter}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='input-box mb-3'>
                  <div className='input-group flex-nowrap '>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='addon-wrapping'>
                        <InstagramIcon />
                      </span>
                      <input
                        type='text'
                        name='instagram'
                        className='form-control'
                        placeholder='Instagram URL'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                        value={instagram}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='input-box mb-3'>
                  <div className='input-group flex-nowrap '>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='addon-wrapping'>
                        <FacebookIcon />
                      </span>
                      <input
                        type='text'
                        name='facebook'
                        className='form-control'
                        placeholder='Facebook URL'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                        value={facebook}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='input-box mb-3'>
                  <div className='input-group flex-nowrap '>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='addon-wrapping'>
                        <LinkedInIcon />
                      </span>
                      <input
                        type='text'
                        name='linkedin'
                        className='form-control'
                        placeholder='Linkedin URL'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                        value={linkedin}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : null}

            <Zoom in={true} className='mb-2'>
              <Fab
                style={{
                  backgroundColor: '#8c52ff',
                  color: '#fff',
                  outline: 'none'
                }}
                variant='extended'
                type='submit'
              >
                SUBMIT
              </Fab>
            </Zoom>
          </form>
        </div>
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

export default connect(mapState, { getProfile, updateProfile })(ProfileForm);
