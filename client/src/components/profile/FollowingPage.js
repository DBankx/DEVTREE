import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import FollowItem from './FollowItem';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const FollowingPage = ({
  getProfileById,
  profile: { profile, loading },
  match
}) => {
  // get the profile from the users id
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  // this controls the clicks of the tab view
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(true);

  function handleClick2() {
    setClick2(true);
    setClick3(false);
  }

  function handleClick3() {
    setClick3(true);
    setClick2(false);
  }

  return (
    <div className='next'>
      <Link
        to={`/profile/${profile && profile.user._id}`}
        style={{ textDecoration: 'none' }}
        className='back-link'
      >
        <KeyboardBackspaceIcon /> Back to Profile
      </Link>
      <div className='wrapper'>
        <div className='tabs'>
          <ul>
            <li onClick={handleClick3} className={click3 ? 'active' : null}>
              <span className='text'>Following</span>
            </li>
            <li onClick={handleClick2} className={click2 ? 'active' : null}>
              <span className='text'>Followers</span>
            </li>
          </ul>
        </div>
        <div className='content'>
          <div
            className='tab-wrap'
            style={{ display: click3 ? 'block' : 'none' }}
          >
            <div className='tab-content'>
              <div className='follow-section'>
                {/* check if the profile is loaded then load the profile following field */}
                {profile && loading === false ? (
                  profile.user.following.length > 0 ? (
                    profile.user.following.map((user) => (
                      <FollowItem key={user._id} user={user} />
                    ))
                  ) : (
                    <p>{profile.user.username} is following no one...</p>
                  )
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
          <div
            className='tab-wrap'
            style={{ display: click2 ? 'block' : 'none' }}
          >
            <div className='tab-content'>
              <div className='follow-section'>
                {profile && loading === false ? (
                  profile.user.followers.length > 0 ? (
                    profile.user.followers.map((user) => (
                      <FollowItem key={user._id} user={user} />
                    ))
                  ) : (
                    <p>{profile.user.username} has no followers...</p>
                  )
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FollowingPage.propTypes = {};

const mapState = (state) => ({
  profile: state.profile
});

export default connect(mapState, { getProfileById })(FollowingPage);
