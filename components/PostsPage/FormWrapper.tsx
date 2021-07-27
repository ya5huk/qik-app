import React from "react";

const PostWrapper: React.FC = ({ children }) => {
  return (
    <div className="row justify-content-center">
      <div className="col col-6">{children}</div>
    </div>
  );
};

export default PostWrapper;
