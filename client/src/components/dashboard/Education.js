import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import ClearIcon from '@material-ui/icons/Clear';
import Moment from 'react-moment';
import SchoolIcon from '@material-ui/icons/School';

const Education = ({ education }) => {
  return (
    <div className='experience-credentials'>
      <h4>
        <SchoolIcon /> Education Credentials
      </h4>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => {
            return (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className='hide-sm'>
                  {edu.fieldofstudy} -{' '}
                  {edu.degree ? <span>{edu.degree}</span> : null}
                </td>
                <td className='hide-sm'>
                  <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                  {edu.to ? (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                  ) : (
                    'current'
                  )}
                </td>
                <td>
                  <Fab
                    style={{
                      outline: 'none',
                      backgroundColor: 'rgb(202, 70, 70)'
                    }}
                  >
                    <ClearIcon style={{ color: '#fff' }} />
                  </Fab>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Education.propTypes = {};

export default Education;
