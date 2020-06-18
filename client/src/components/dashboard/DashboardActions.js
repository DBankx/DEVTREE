import React from 'react';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';

const DashboardActions = (props) => {
  return (
    <div className='trigger-actions'>
      <ul>
        <li>
          <Link to='/edit-profile' className='btn-link'>
            <EditIcon /> Edit Profile
          </Link>
        </li>
        <li>
          <Link to='/add-education' className='btn-link'>
            <SchoolIcon /> Add Education
          </Link>
        </li>
        <li>
          <Link to='/add-experience' className='btn-link'>
            <WorkIcon /> Add Experience
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardActions;
