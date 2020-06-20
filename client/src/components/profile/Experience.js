import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ profile }) => {
  return (
    <Fragment>
      {profile.experience.length > 0 ? (
        <div className='experience'>
          <h3>Experience</h3>
          {profile.experience.map((exp) => {
            return (
              <div className='exp-sec' key={exp._id}>
                <h4>{exp.company}</h4>
                <p className='mt-2'>
                  <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                  {exp.to ? (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                  ) : (
                    'current'
                  )}
                </p>
                {exp.location && (
                  <p>
                    <strong>Location: </strong>
                    {exp.location}
                  </p>
                )}

                {exp.status && (
                  <p>
                    <strong>Role: </strong>
                    {exp.status}
                  </p>
                )}

                {exp.description && (
                  <p>
                    <strong>Description: </strong>
                    {exp.description}
                  </p>
                )}

                <hr />
              </div>
            );
          })}
        </div>
      ) : (
        <p>user has no experience</p>
      )}
    </Fragment>
  );
};

Experience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Experience;
