import React, { Component } from "react";
const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  classes = liked ? classes : classes + "-o";
  return (
    <i
      onClick={onClick}
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
