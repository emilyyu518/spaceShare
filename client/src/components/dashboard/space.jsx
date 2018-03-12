import React from 'react';
import { Link } from 'react-router-dom';

const Space = (props) => {
  const { id, name, purpose } = props.space;

  const glyph = purpose === 'Live' ? (
    <i className="material-icons sidebar-icon">home</i>
  ) : (
    <i className="material-icons sidebar-icon">business</i>
  );
  return (
    <Link to={{ pathname: '/common-area', state: { spaceId: id } }}>
      <div className="row">
        {glyph}{name}
      </div>
    </Link>
  );
};

export default Space;
