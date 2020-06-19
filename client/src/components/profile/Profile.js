import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfileById, getProfile } from '../../actions/profile';
import { connect } from 'react-redux';

const Profile = ({
  getProfile,
  getProfileById,
  auth: { user },
  profile: { profile, viewProfile, loading },
  match
}) => {
  useEffect(() => {
    async function profile() {
      await user;
      getProfile();
    }

    profile();
    getProfileById(match.params.id);
  }, [getProfileById, user, getProfile]);

  return <div>Hello</div>;
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapState = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapState, { getProfileById, getProfile })(Profile);
