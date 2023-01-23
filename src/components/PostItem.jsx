import React from 'react';

const Post = (props) => {

    return (
        <div className="post">
            <h3>{props.post.id}. {props.post.title}</h3>
            <p>{props.post.description}</p>
            <button>Delete</button>
        </div>
    );
};

export default Post;