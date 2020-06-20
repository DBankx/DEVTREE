import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import YoutubeIcon from '@material-ui/icons/YouTube';

const ProfileTop = ({ profile, auth }) => {
  return (
    <div className='profile-top'>
      <div className='profile-image'>
        <img src={profile.user.avatar} alt='' className='rounded-circle' />
        <div className='img-words'>
          <h1>{profile.user.username}</h1>
          <h3 className='mt-2'>{profile.status}</h3>
          {auth.isAuthenticated ? (
            <Zoom in={true}>
              <Fab variant='extended'>Follow</Fab>
            </Zoom>
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
  auth: PropTypes.object.isRequired
};

export default ProfileTop;
