import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import WorkIcon from '@material-ui/icons/Work';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import ClearIcon from '@material-ui/icons/Clear';

const Experience = ({ experience }) => {
  return (
    <div class='experience-credentials'>
      <h4>
        <WorkIcon /> Experience Credentials{' '}
      </h4>
      <table class='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th class='hide-sm'>Position</th>
            <th class='hide-sm'>Dates</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience
            ? experience.map((exp) => {
                return (
                  <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td class='hide-sm'>{exp.title}</td>
                    <td class='hide-sm'>
                      <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                      {exp.to ? (
                        <Moment fromat='YYYY/MM/DD'>{exp.from}</Moment>
                      ) : (
                        'current'
                      )}
                    </td>
                    <td>
                      <Zoom in={true}>
                        <Fab
                          style={{
                            outline: 'none',
                            backgroundColor: 'rgb(202, 70, 70)'
                          }}
                        >
                          <ClearIcon style={{ color: '#fff' }} />
                        </Fab>
                      </Zoom>
                    </td>
                  </tr>
                );
              })
            : 'No previous Experience'}

          <tr>
            <td>Traversy Media</td>
            <td class='hide-sm'>Instructor & Developer</td>
            <td class='hide-sm'>02-03-2015 - Now</td>
            <td>
              <button class='btn btn-danger'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
