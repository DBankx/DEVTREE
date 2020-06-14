import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Navbar2 = ({ auth: { isAuthenticated } }) => {
  return (
    <Fragment>
      {isAuthenticated ? (
        <nav className='navigation2'>
          <ul className='navi2'>
            <li>Jun/20/2021</li>
            <li className='optional'>
              status: <span className='status'>ONLINE</span>
            </li>
            <li>
              <div className='prof'>
                <span className='profile-pic'>DBankx</span>
                <img className='rounded-circle' src='john.jpg' alt='' />
                <i className='fas fa-chevron-down'></i>
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
