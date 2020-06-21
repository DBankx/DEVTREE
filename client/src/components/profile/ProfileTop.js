import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import YoutubeIcon from '@material-ui/icons/YouTube';
import { follow, unfollow } from '../../actions/auth';
import { connect } from 'react-redux';

const ProfileTop = ({ profile, auth, follow, unfollow }) => {
  // function that checks if a user is following someone depending if the use is authenticated or not
  var isFollowing;

  function getIsFollowing() {
    if (auth.isAuthenticated == true) {
      isFollowing = auth.user.following.find(
        (flw) => flw.user === profile.user._id
      );
    } else {
      isFollowing = null;
    }
  }

  getIsFollowing();

  return (
    <div className='profile-top'>
      <div className='profile-image'>
        <img src={profile.user.avatar} alt='' className='rounded-circle' />
        <div className='img-words'>
          <h1>{profile.user.username}</h1>
          <h3 className='mt-2'>{profile.status}</h3>
          {auth.isAuthenticated ? (
            isFollowing == null ? (
              <Zoom in={true}>
                <Fab
                  variant='extended'
                  onClick={() => follow(profile.user._id)}
                  style={{ outline: 'none' }}
                >
                  Follow
                </Fab>
              </Zoom>
            ) : (
              <Zoom in={true}>
                <Fab
                  variant='extended'
                  style={{ outline: 'none' }}
                  onClick={() => unfollow(profile.user._id)}
                >
                  UnFollow
                </Fab>
              </Zoom>
            )
          ) : null}

          <ul className='links mt-4'>
            {profile.website && (
              <li>
                <a
                  href={profile.website}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <LanguageIcon />
                </a>
              </li>
            )}

            {profile.social && profile.social.twitter && (
              <li>
                <a
                  href={profile.social.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <TwitterIcon />
                </a>
              </li>
            )}

            {profile.social && profile.social.instagram && (
              <li>
                <a
                  href={profile.social.Instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <InstagramIcon />
                </a>
              </li>
            )}

            {profile.social && profile.social.facebook && (
              <li>
                <a
                  href={profile.social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FacebookIcon />
                </a>
              </li>
            )}
            {profile.social && profile.social.youtube && (
              <li>
                <a
                  href={profile.social.youtube}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <YoutubeIcon />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired
};

export default connect(null, { follow, unfollow })(ProfileTop);
