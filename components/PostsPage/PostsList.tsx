import React from 'react';
import {Post} from '../../lib/Interfaces';
import PostBox from './PostBox';
import PostsWrapper from './PostsWrapper';

interface Props {
    posts: Post[]
}

const PostsList: React.FC<Props> = ({posts}) => {
    return <PostsWrapper>
        {posts.map(post => <PostBox key={post.id} post={post}/>)}
    </PostsWrapper>
    
}

export default PostsList