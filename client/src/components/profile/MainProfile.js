import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import Profilebio from './Profilebio';
import ProfileSkills from './ProfileSkills';
import Experience from './Experience';
import Education from './Education';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';

const MainProfile = ({
  getProfileById,
  auth,
  profile: { profile, loading },
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  return (
    <Fragment>
      {profile === null || loading ? (
        profile === null && loading === false ? (
          <div className='next'>
            <div className='error-text'>
              <p>You have not set up your profile yet</p>
              <Zoom in={true}>
                <Fab variant='extended'>
                  <Link to='/create-profile'>Create Profile</Link>
                </Fab>
              </Zoom>
            </div>
          </div>
        ) : (
          <Spinner />
        )
      ) : (
        <div className='next'>
          <div className='profile'>
            <ProfileTop profile={profile} auth={auth} />
            <Profilebio profile={profile} />
            <ProfileSkills profile={profile} />
            <div className='exp-edu'>
              <Experience profile={profile} />
              <Education profile={profile} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

MainProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapState = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapState, { getProfileById })(MainProfile);
