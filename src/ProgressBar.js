import React from "react";
import PropTypes from "prop-types";
import "./progress.css";

const Progress = ({ themes }) => {
  const { primary } = themes;

  return (
    <div className="wrapper">
      <div className="background">
        <div className="line" style={{ backgroundColor: primary }} />
      </div>
    </div>
  );
};

Progress.propTypes = {
  themes: PropTypes.shape().isRequired,
};

export default Progress;
