import React from 'react';
import '../../styles/loading.scss';

const Loader = ({ message }) => {
  return (
    <div className="loader-container">
      <div className="honeycomb">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {message && <h2 className="loader-message">{message}</h2>}
    </div>
  );
};

export default Loader;