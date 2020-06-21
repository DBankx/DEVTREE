import React, { Fragment } from 'react';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';
import Fab from '@material-ui/core/Fab';
import devtree2 from '../../img/devtree2.png';
import Zoom from '@material-ui/core/Zoom';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import MarkunreadMailboxTwoToneIcon from '@material-ui/icons/MarkunreadMailboxTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ContactSupportTwoToneIcon from '@material-ui/icons/ContactSupportTwoTone';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const guestLinks = (
    <Zoom in={true}>
      <ul className='navi-nav'>
        <li className='logo'>
          <Link to='/' className='navi-link'>
            <img className='logo-img-main' src={devtree2} alt='' />
            <span className='link-text'>Devtree</span>
          </Link>
        </li>

        <li className='navi-item'>
          <Link to='/' className='navi-link'>
            <HomeTwoToneIcon className='fas' />
            <span className='link-text'>Home</span>
          </Link>
        </li>
        <li className='navi-item'>
          <Link to='/register' className='navi-link'>
            <PersonAddTwoToneIcon className='fas' />
            <span className='link-text'>Register</span>
          </Link>
        </li>
        <li className='navi-item'>
          <Link to='/login' className='navi-link'>
            <LockOpenTwoToneIcon className='fas' />
            <span className='link-text'>Login</span>
          </Link>
        </li>
        <li className='navi-item'>
          <Link to='/developers' className='navi-link'>
            <PeopleAltTwoToneIcon className='fas' />
            <span className='link-text'>Developers</span>
          </Link>
        </li>
        <li className='navi-item'>
          <Link to='/contact' className='navi-link'>
            <ContactSupportTwoToneIcon className='fas' />
            <span className='link-text'>Contact</span>
          </Link>
        </li>
        <li className='navi-item hide-sm'>
          <Link to='/about' className='navi-link'>
            <InfoTwoToneIcon className='fas' />
            <span className='link-text'>About</span>
          </Link>
        </li>
      </ul>
    </Zoom>
  );

  const authLinks = (
    <ul className='navi-nav'>
      <li className='logo'>
        <a href='#' className='navi-link'>
          <img className='logo-img-main' src={devtree2} alt='' />
          <span className='link-text'>Devtree</span>
        </a>
      </li>

      <li className='navi-item'>
        <Link to='/dashboard' className='navi-link'>
          <DashboardTwoToneIcon className='fas' />
          <span className='link-text'>Dashboard</span>
        </Link>
      </li>
      <li className='navi-item'>
        <Link to='/feed' className='navi-link'>
          <MarkunreadMailboxTwoToneIcon className='fas' />
          <span className='link-text'>Feed</span>
        </Link>
      </li>
      <li className='navi-item'>
        <Link to='/developers' className='navi-link'>
          <PeopleAltTwoToneIcon className='fas' />
          <span className='link-text'>Developers</span>
        </Link>
      </li>
      <li className='navi-item'>
        <Link to={`/profile/${user && user._id}`} className='navi-link'>
          <AccountCircleTwoToneIcon className='fas' />
          <span className='link-text'>Profile</span>
        </Link>
      </li>
      <li className='navi-item hide-sm'>
        <a href='#' onClick={() => logout()} className='navi-link'>
          <Zoom in={true}>
            <Fab onClick={() => logout()} className='logout-button'>
              <PowerSettingsNewTwoToneIcon className='fas2' />
            </Fab>
          </Zoom>
          <span className='link-text'>logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className='navigation'>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    </Fragment>
  );
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState, { logout })(Navbar);
