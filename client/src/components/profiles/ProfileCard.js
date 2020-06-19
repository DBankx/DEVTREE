import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-router-dom';

const ProfileCard = ({
  profile: {
    status,
    company,
    user: { avatar, username, followers, following, _id },
    location
  }
}) => {
  return (
    <div class='card'>
      <img
        src={avatar}
        className='rounded-circle card-img-top'
        alt='Profile Image'
      />
      <div class='card-body'>
        <h5 class='card-title'>{username}</h5>
        <ul className='cardList'>
          <li>
            <strong>{following.length} </strong>following
          </li>
          <li>
            <strong>{followers.length} </strong>followers
          </li>
        </ul>
        <Zoom in={true}>
          <Fab variant='extended' style={{ outline: 'none' }}>
            <Link to={`/profile/${_id}`} class='btndev'>
              View Profile
            </Link>
          </Fab>
        </Zoom>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileCard;
