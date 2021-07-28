import React from 'react';

const PostsWrapper: React.FC = ({ children }) => {
  
  return (
    <div className="row justify-content-center mt-5">
      <div className="col col-4">{children}</div>
    </div>
  );
};

export default PostsWrapper;
