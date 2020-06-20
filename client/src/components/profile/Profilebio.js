import React from 'react';
import PropTypes from 'prop-types';
import FaceIcon from '@material-ui/icons/Face';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

const Profilebio = ({ profile }) => {
  return (
    <div className='profile-bio'>
      <h3>Details</h3>
      <div className='main-profile mt-2'>
        <table>
          <tbody>
            <tr>
              <td>
                <FaceIcon />
              </td>
              <td>
                <strong>{profile.user.name}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <LocationOnIcon />
              </td>
              <td>
                <strong>{profile.location}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <BusinessIcon />
              </td>
              <td>
                {profile.status}{' '}
                {profile.company ? <span>at {profile.company}</span> : null}
              </td>
            </tr>
            {profile.bio ? (
              <tr>
                <td>
                  <FingerprintIcon />
                </td>
                <td>{profile.bio}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Profilebio.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profilebio;
