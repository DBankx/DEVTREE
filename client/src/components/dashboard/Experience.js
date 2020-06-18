import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import WorkIcon from '@material-ui/icons/Work';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { deleteExp } from '../../actions/profile';

const Experience = ({ experience, deleteExp }) => {
  return (
    <div className='experience-credentials'>
      <h4>
        <WorkIcon /> Experience Credentials{' '}
      </h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Position</th>
            <th className='hide-sm'>Dates</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience
            ? experience.map((exp) => {
                return (
                  <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td className='hide-sm'>{exp.title}</td>
                    <td className='hide-sm'>
                      <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                      {exp.to ? (
                        <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
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
                          onClick={() => deleteExp(exp._id)}
                        >
                          <ClearIcon style={{ color: '#fff' }} />
                        </Fab>
                      </Zoom>
                    </td>
                  </tr>
                );
              })
            : 'No previous Experience'}
        </tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExp: PropTypes.func.isRequired
};

export default connect(null, { deleteExp })(Experience);
