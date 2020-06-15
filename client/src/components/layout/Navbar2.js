import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Spinner from './Spinner';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Navbar2 = ({ auth: { isAuthenticated, user, loading } }) => {
  const today = new Date();
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const mainDate = today.toLocaleDateString('en-US', options);
  return (
    <Fragment>
      {isAuthenticated ? (
        <nav className='navigation2'>
          <ul className='navi2'>
            <li>{mainDate}</li>
            <li className='optional'>
              status:{' '}
              {loading ? (
                <span className='status'>OFFLINE</span>
              ) : (
                <span className='status'>ONLINE</span>
              )}
            </li>
            <li>
              <div className='prof'>
                {user !== null && loading === false ? (
                  <strong>{user.username}</strong>
                ) : null}

                {user !== null && loading === false ? (
                  <Avatar src={user.avatar} alt='user' />
                ) : null}
                <MoreVertIcon className='chevron' />
              </div>
            </li>
          </ul>
        </nav>
      ) : null}
    </Fragment>
  );
};

Navbar2.propTypes = {
  auth: PropTypes.func.isRequired
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState)(Navbar2);
