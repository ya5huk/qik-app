import React, { FormEvent, useRef } from "react";
import FormWrapper from './FormWrapper';
import classes from './PostForm.module.css';
interface Props { 
  addPost: (content: string) => void;
}

const Filter = require('bad-words');
const filter = new Filter();
// Language filter, using: https://www.npmjs.com/package/bad-words

const PostForm: React.FC<Props> = ({ addPost }) => {
  const content = useRef<HTMLTextAreaElement>(null);

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    let postContent = content.current?.value.substr(0, 300); // Take first 300 chars
    if(postContent !== undefined && postContent !== '') {
      postContent = filter.clean(postContent);
      addPost(postContent as string);
    }
    if(content && content.current) {
      content.current.value = '';
    }
    
  }

  return (
    <FormWrapper>
        <form className="d-flex flex-column form-group" onSubmit={handlePostSubmit}>
            <textarea
              className={`form-control ${classes.textAreaStyles}`}
              placeholder="What's on your mind?"
              name="postContent"
              id="postContent"
              rows={6}
              maxLength={200}
              ref={content}
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
