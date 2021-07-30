import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import FullPost from '../../components/PostsPage/FullPost';
import { Post } from '../../lib/Interfaces';
import {getAllPostsId, getPostWithId} from '../../lib/Posts';

interface Props {
    post: Post
}

const FullPostPage:React.FC<Props> = ({post}) => {
    return <FullPost post={post} liked={true}/>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await getAllPostsId();
    let paths = res?.map((postId) => ({
        params: { postId: postId },
      }));
      console.log(paths);
        
    return {
        paths, fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const postId = context.params?.postId;
    const gottenPost = await getPostWithId(postId as string);
    const post: Post = {
        author: gottenPost?.author,
        content: gottenPost?.content,
        creationTime: gottenPost?.creationTime,
        likesAmount: gottenPost?.likesAmount,
        id: gottenPost?._id.toString()
    }
    return {
        props: {
            post: post,
        }
    }
}
export default FullPostPage;