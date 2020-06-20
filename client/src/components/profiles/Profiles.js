import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles, getProfile } from '../../actions/profile';
import ProfileCard from './ProfileCard';
import Spinner from '../layout/Spinner';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

const Profiles = ({ profile, getAllProfiles }) => {
  useEffect(() => {
    // getProfile()
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <Fragment>
      {profile.loading ? (
        <Spinner />
      ) : (
        <div className='next'>
          <div className='developers'>
            <div className='find-user'>
              <form>
                <TextField
                  id='outlined-basic'
                  name='dev'
                  label='Find a dev'
                  variant='outlined'
                  type='text'
                  style={{ width: '80%' }}
                />
                <Zoom in={true}>
                  <Fab>
                    <SearchIcon />
                  </Fab>
                </Zoom>
              </form>
            </div>
            <div className='devs'>
              {profile.profiles.length > 0 ? (
                profile.profiles.map((profile) => {
                  return <ProfileCard key={profile._id} profile={profile} />;
                })
              ) : (
                <Spinner />
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
  profile: PropTypes.object.isRequired
};

const mapState = (state) => ({
  profile: state.profile
});

export default connect(mapState, { getAllProfiles })(Profiles);
