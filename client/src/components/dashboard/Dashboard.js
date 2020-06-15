import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfile } from '../../actions/profile';
import auth from '../../reducers/auth';
import FaceIcon from '@material-ui/icons/Face';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getProfile
}) => {
  useEffect(() => {
    getProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='dash-box'>
      <div className='greeting'>
        <h2>Dashboard</h2>
        <h3>
          Welcome back <strong>{user ? user.username : null}</strong>
        </h3>
      </div>
      <div className='dashboard'>
        <DashboardActions />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapState = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapState, { getProfile })(Dashboard);
