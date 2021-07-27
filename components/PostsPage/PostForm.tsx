import React from "react";
import FormWrapper from './FormWrapper';
import classes from './PostForm.module.css';

const PostForm: React.FC = ({ children }) => {
  return (
    <FormWrapper>
        <form className="d-flex flex-column form-group">
            <textarea
              className={`form-control ${classes.textAreaStyles}`}
              placeholder="What's on your mind?"
              name="postContent"
              id="postContent"
              rows={6}
              maxLength={200}
            ></textarea>
            <button
              name="submitPost"
              id="submitPost"
              className="align-self-end mt-3 btn btn-danger"
              role="button"
            >
              Post
            </button>
          </form>
    </FormWrapper>
  );
};

export default PostForm;
