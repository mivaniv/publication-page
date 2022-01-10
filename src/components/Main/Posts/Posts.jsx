import React from 'react';
import classes from "./Posts.module.css";

const Posts = ({post}) => {
    const {name, description} = post;
    return (
        <div className={classes.Publication}>
            <div className={classes.title}>
                <p> {name}</p>
            </div>
            <div className={classes.description}>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Posts;