import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({ profile }) => {
  return (
    <Fragment>
      {profile.education.length > 0 ? (
        <div className='education'>
          <h3>Education</h3>
          {profile.education.map((edu) => {
            return (
              <div className='edu-sec' key={edu._id}>
                <h4>{edu.school}</h4>
                <p className='mt-2'>
                  <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                  {edu.to ? (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                  ) : (
                    'current'
                  )}
                </p>
                <p className='mt-2'>
                  <strong>Field of study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p className='mt-2'>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                {edu.description && (
                  <p className='mt-2'>
                    <strong>Description: </strong>
                    {edu.description}
                  </p>
                )}

                <hr />
              </div>
            );
          })}
        </div>
      ) : (
        <p>User has no education</p>
      )}
    </Fragment>
  );
};

Education.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Education;
