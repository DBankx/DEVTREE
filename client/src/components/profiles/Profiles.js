import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles, getProfile } from '../../actions/profile';
import ProfileCard from './ProfileCard';
import Spinner from '../layout/Spinner';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { getProfileByUsername } from '../../actions/profile';

const Profiles = ({ profile, getAllProfiles, getProfileByUsername }) => {
  const [username, setText] = useState('');

  useEffect(() => {
    // getProfile()
    getAllProfiles();
  }, [getAllProfiles]);

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <Fragment>
      {profile.loading ? (
        <Spinner />
      ) : (
        <div className='next'>
          <div className='developers'>
            <div className='find-user'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  getProfileByUsername({ username });
                }}
              >
                <TextField
                  id='outlined-basic'
                  name='username'
                  onChange={handleChange}
                  value={username}
                  label='Find a dev'
                  variant='outlined'
                  type='text'
                  style={{ width: '80%' }}
                />
                <Zoom in={true}>
                  <Fab type='submit'>
                    <SearchIcon />
                  </Fab>
                </Zoom>
              </form>
            </div>
            <div className='devs'>
              {profile.viewProfiles.length < 0 || username.length <= 0 ? (
                profile.profiles.length > 0 ? (
                  profile.profiles.map((profile) => {
                    return <ProfileCard key={profile._id} profile={profile} />;
                  })
                ) : (
                  <Spinner />
                )
              ) : profile.viewProfiles.length > 0 ? (
                profile.viewProfiles.map((profile) => {
                  return <ProfileCard key={profile._id} profile={profile} />;
                })
              ) : (
                <h4 className='error'>Profile Not Found</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileByUsername: PropTypes.func.isRequired
};

const mapState = (state) => ({
  profile: state.profile
});

export default connect(mapState, { getAllProfiles, getProfileByUsername })(
  Profiles
);
