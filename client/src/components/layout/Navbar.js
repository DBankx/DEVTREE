import React, { Fragment } from 'react';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';
import Fab from '@material-ui/core/Fab';
import devtree2 from '../../img/devtree2.png';
import Zoom from '@material-ui/core/Zoom';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='navigation'>
        <ul className='navi-nav'>
          <li className='logo'>
            <a href='#' className='navi-link'>
              <img className='logo-img-main' src={devtree2} alt='' />
              <span className='link-text'>Devtree</span>
            </a>
          </li>

          <li className='navi-item'>
            <a href='#' className='navi-link'>
              <HomeTwoToneIcon className='fas' />
              <span className='link-text'>Home</span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='#' className='navi-link'>
              <PersonAddTwoToneIcon className='fas' />
              <span className='link-text'>Register</span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='#' className='navi-link'>
              <LockOpenTwoToneIcon className='fas' />
              <span className='link-text'>Login</span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='#' className='navi-link'>
              <PeopleAltTwoToneIcon className='fas' />
              <span className='link-text'>Developers</span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='#' className='navi-link'>
              <Zoom in={true}>
                <Fab className='logout-button'>
                  <PowerSettingsNewTwoToneIcon className='fas2' />
                </Fab>
              </Zoom>
              <span className='link-text'>log-off</span>
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
