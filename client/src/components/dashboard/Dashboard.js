import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Fab from '@material-ui/core/Fab';
import FaceIcon from '@material-ui/icons/Face';
import Education from './Education';

function Dashboard({
  getProfile,
  auth: { user },
  profile: { profile, loading }
}) {
  useEffect(async () => {
    await user;
    getProfile();
  }, [getProfile]);

  // if the profile is null and its still loading show the spinner
  return loading && profile === null && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div class='next'>
        <div class='dash-box'>
          <div class='greeting'>
            <h2>Dashboard</h2>
            <h3>
              <FaceIcon /> Welcome back <strong>{user && user.username}</strong>
            </h3>
          </div>
          <div className='dashboard'>
            {profile !== null ? (
              <Fragment>
                {' '}
                <DashboardActions />
                {profile.experience ? (
                  <Experience experience={profile.experience} />
                ) : (
                  <h4>No Experience Added... </h4>
                )}
                {profile.education ? (
                  <Education education={profile.education} />
                ) : (
                  <h4>No Education Added...</h4>
                )}
                <Fab
                  variant='extended'
                  style={{
                    backgroundColor: 'rgb(202, 70, 70)',
                    color: '#fff',
                    outline: 'none'
                  }}
                >
                  Delete Account
                </Fab>
              </Fragment>
            ) : (
              <Fragment>
                <p>You have not set up a profile, Please add some info</p>
                <Fab variant='extended'>
                  <Link to='/create-profile'>Create Profile</Link>
                </Fab>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
