import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const followItem = ({ user }) => {
  return (
    <div className='follow-item'>
      <ul>
        <li>
          <Link to={`/profile/${user.user}`}>
            <Avatar src={user.avatar} alt='user image' />
          </Link>
        </li>
        <li>
          <strong>{user.username}</strong>
        </li>
      </ul>
    </div>
  );
};

followItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default followItem;
