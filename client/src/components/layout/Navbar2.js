import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../../actions/auth';
import { Link, withRouter } from 'react-router-dom';

const Navbar2 = ({
  auth: { isAuthenticated, user, loading },
  logout,
  history
}) => {
  const today = new Date();
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric'
  };
  const mainDate = today.toLocaleDateString('en-US', options);

  // setting the state of the menu button

  const [anchor, setAnchor] = useState(null);

  function handleClick(e) {
    setAnchor(e.currentTarget);
  }

  function handleClose() {
    setAnchor(null);
  }

  return (
    <Fragment>
      {isAuthenticated ? (
        <nav className='navigation2'>
          <ul className='navi2'>
            <li className='date-top optional'>{mainDate}</li>
            <li className='optional status-top'>
              status:{' '}
              {loading ? (
                <span className='status'>OFFLINE</span>
              ) : (
                <span className='status'>ONLINE</span>
              )}
            </li>
          </ul>
          <ul className='profile-links'>
            <li>
              {user !== null && loading === false ? (
                <strong>{user.username}</strong>
              ) : null}
            </li>
            <li>
              {user !== null && loading === false ? (
                <Avatar src={user.avatar} alt='user' />
              ) : null}
            </li>
            <li>
              {' '}
              <MoreVertIcon
                className='chevron'
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              />
              <Menu
                id='simple-menu'
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to={'/dashboard'}
                    style={{ textDecoration: 'none', color: '#000' }}
                  >
                    My account
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={'/edit-profile'}
                    style={{ textDecoration: 'none', color: '#000' }}
                  >
                    Edit profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/profile/${user && user._id}`}
                    style={{ textDecoration: 'none', color: '#000' }}
                  >
                    View profile
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logout(history);
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </nav>
      ) : null}
    </Fragment>
  );
};

Navbar2.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { logout })(withRouter(Navbar2));
