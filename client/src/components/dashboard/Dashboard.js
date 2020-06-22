import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, deleteAccunt } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Fab from '@material-ui/core/Fab';
import Education from './Education';
import Zoom from '@material-ui/core/Zoom';

function Dashboard({
  getProfile,
  deleteAccunt,
  auth: { user },
  profile: { profile, loading }
}) {
  useEffect(() => {
    async function profile() {
      await user;
      getProfile();
    }

    profile();
  }, [getProfile, user]);

  // if the profile is null and its still loading show the spinner
  return loading && profile === null && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='next'>
        <div className='dash-box'>
          <div className='greeting'>
            <h2>Dashboard</h2>
            <h3>
              Welcome <strong>{user && user.username}</strong>
            </h3>
          </div>
          <div className='dashboard'>
            {profile !== null ? (
              <Fragment>
                {' '}
                <DashboardActions />
                {profile.experience.length > 0 ? (
                  <Experience experience={profile.experience} />
                ) : (
                  <h6 className='mt-4' style={{ fontWeight: '600' }}>
                    No Experience Added...{' '}
                  </h6>
                )}
                {profile.education.length > 0 ? (
                  <Education education={profile.education} />
                ) : (
                  <h6 className='mt-4' style={{ fontWeight: '600' }}>
                    No Education Added...
                  </h6>
                )}
                <Fab
                  variant='extended'
                  style={{
                    backgroundColor: 'rgb(202, 70, 70)',
                    color: '#fff',
                    outline: 'none'
                  }}
                  onClick={() => deleteAccunt()}
                  className='mt-4'
                >
                  Delete Account
                </Fab>
              </Fragment>
            ) : (
              <Fragment>
                <div className='div-bottom'>
                  <p className='mt-3'>
                    You have not set up a profile, Please add some info
                  </p>
                  <Zoom in={true}>
                    <Fab
                      className='mt-3'
                      variant='extended'
                      style={{
                        backgroundColor: '#8c52ff',
                        padding: '8px 30px'
                      }}
                    >
                      <Link
                        to='/create-profile'
                        style={{ color: '#fff', textDecoration: 'none' }}
                      >
                        Create Profile
                      </Link>
                    </Fab>
                  </Zoom>
                </div>
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
  auth: PropTypes.object.isRequired,
  education: PropTypes.array,
  experience: PropTypes.array,
  deleteAccunt: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfile, deleteAccunt })(
  Dashboard
);
